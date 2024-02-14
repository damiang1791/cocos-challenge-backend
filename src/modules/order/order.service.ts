import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../../core/entities/order.entity';
import { Repository } from 'typeorm';
import {
  Balance,
  OrderSide,
  OrderState,
  InstrumentDetail,
  TotalBalance,
  CreateOrderDto,
  OrderType,
  OrderSideOperation,
} from './order.types';
import { InstrumentService } from '../instrument/instrument.service';
import { MarketdataService } from '../marketdata/marketdata.service';
import { instrumentType } from '../instrument/instrument.type';
import {
  OrderCanceledInsufficientAmountError,
  OrderCanceledInsufficientInstrumentsError,
} from './order.errors';
import { UserService } from '../user/user.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private repository: Repository<OrderEntity>,
    private instrumentService: InstrumentService,
    private marketdataService: MarketdataService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  findOrdersByUserId(userId: number): Promise<OrderEntity[]> {
    return this.repository.findBy({ userid: userId });
  }

  private async getAmountAvailable(userId: number): Promise<number> {
    const orders = await this.findOrdersByUserId(userId);

    let amountAvailable = 0;
    for (const order of orders) {
      if (
        order.side === OrderSide.BUY &&
        (order.status === OrderState.FILLED || order.status === OrderState.NEW)
      ) {
        amountAvailable -= order.size * order.price;
      } else if (
        order.side === OrderSide.SELL &&
        order.status === OrderState.FILLED
      ) {
        amountAvailable += order.size * order.price;
      } else if (order.side === OrderSide.CASH_IN) {
        amountAvailable += order.size * order.price;
      } else if (order.side === OrderSide.CASH_OUT) {
        amountAvailable -= order.size * order.price;
      }
    }

    return amountAvailable;
  }

  private async getUserInstruments(userId: number): Promise<Balance> {
    let totalAmount = 0;
    const userOrders = await this.repository.findBy({
      userid: userId,
      status: OrderState.FILLED,
    });

    const instrumentIds = new Set(
      userOrders.map((order) => order.instrumentid),
    );
    const instruments = await this.instrumentService.findByIds([
      ...instrumentIds,
    ]);

    const userInstruments: InstrumentDetail[] = [];

    for (const instrument of instruments) {
      const instrumentOrders = userOrders.filter(
        (order) => order.instrumentid === instrument.id,
      );

      if (instrument.type === instrumentType.ACCIONES) {
        let totalQuantity = 0;
        let totalValue = 0;

        for (const order of instrumentOrders) {
          if (order.side === OrderSide.BUY) {
            if (order.status === OrderState.FILLED) {
              totalQuantity += order.size;
              totalValue += order.size * order.price;
            }
          } else if (
            order.side === OrderSide.SELL &&
            order.status === OrderState.FILLED
          ) {
            totalQuantity -= order.size;
            totalValue -= order.size * order.price;
          }
        }

        if (totalQuantity) {
          const marketData = await this.marketdataService.findOne(
            instrument.id,
          );

          const currentValue = totalQuantity * marketData.close;
          const performance = ((currentValue - totalValue) / totalValue) * 100;
          totalAmount += currentValue;

          userInstruments.push({
            instrument: instrument.ticker,
            instrumentName: instrument.name,
            quantity: totalQuantity,
            totalValue: currentValue,
            performance: performance,
          });
        }
      }
    }

    return {
      totalAmountInstruments: totalAmount,
      instruments: userInstruments,
    };
  }

  async findReportByUserId(userId: number): Promise<TotalBalance> {
    const amountAvailable = await this.getAmountAvailable(userId);
    const { totalAmountInstruments, instruments } =
      await this.getUserInstruments(userId);

    return {
      amountAvailable,
      totalAmountInstruments,
      instruments,
    };
  }

  private async validateQuantityOfInstruments(
    userId: number,
    ticker: string,
    size: number,
  ) {
    const { instruments } = await this.getUserInstruments(userId);
    const [instrument] = instruments.filter(
      (inst) => inst.instrument === ticker,
    );

    if (!instrument || instrument.quantity < size) {
      throw new OrderCanceledInsufficientInstrumentsError(ticker);
    }
  }

  private async validateAmount(userId: number, ticker: string, size: number) {
    const amountAvailable = await this.getAmountAvailable(userId);
    const { id: instrumentid } =
      await this.instrumentService.getInstrumentByTicker(ticker);
    const { close } = await this.marketdataService.findOne(instrumentid);

    if (size * close < amountAvailable) {
      throw new OrderCanceledInsufficientAmountError(ticker);
    }
  }

  async createOrder(createOrder: CreateOrderDto) {
    await this.userService.getUserById(createOrder.userId);

    if (createOrder.side === OrderSideOperation.SELL) {
      await this.validateQuantityOfInstruments(
        createOrder.userId,
        createOrder.ticker,
        createOrder.size,
      );
    } else if (createOrder.side === OrderSideOperation.BUY) {
      await this.validateAmount(
        createOrder.userId,
        createOrder.ticker,
        createOrder.size,
      );
    }

    const newOrder = this.repository.create();

    newOrder.userid = createOrder.userId;
    newOrder.size = createOrder.size;
    newOrder.type = createOrder.type;
    newOrder.side = createOrder.side;
    newOrder.datetime = new Date();

    const { id: instrumentid } =
      await this.instrumentService.getInstrumentByTicker(createOrder.ticker);
    newOrder.instrumentid = instrumentid;

    if (createOrder.type === OrderType.LIMITE) {
      newOrder.price = createOrder.limitPrice;
      newOrder.status = OrderState.NEW;
    } else if (createOrder.type === OrderType.MARKET) {
      const { close } = await this.marketdataService.findOne(instrumentid);
      newOrder.price = close;
      newOrder.status = OrderState.FILLED;
    }

    return await this.repository.save(newOrder);
  }
}
