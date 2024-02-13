import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../../core/entities/order.entity';
import { In, Repository } from 'typeorm';
import {
  Balance,
  OrderSide,
  OrderState,
  InstrumentDetail,
  TotalBalance,
} from './order.types';
import { InstrumentService } from '../instrument/instrument.service';
import { MarketdataService } from '../marketdata/marketdata.service';
import { instrumentType } from '../instrument/instrument.type';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private repository: Repository<OrderEntity>,
    private instrumentService: InstrumentService,
    private marketdataService: MarketdataService,
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
}
