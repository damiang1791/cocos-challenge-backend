import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../../core/entities/order.entity';
import { Repository } from 'typeorm';
import { Balance, OrderSide, OrderState, InstrumentDetail } from './order.types';
import { InstrumentService } from '../instrument/instrument.service';
import { MarketdataService } from '../marketdata/marketdata.service';

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

  private async getAccountBalance(userId: number): Promise<number> {
    const orders = await this.findOrdersByUserId(userId);

    let balance = 0;
    for (const order of orders) {
      if (
        order.side === OrderSide.BUY &&
        (order.status === OrderState.FILLED || order.status === OrderState.NEW)
      ) {
        balance -= order.size * order.price;
      } else if (order.side === OrderSide.SELL && order.status === OrderState.FILLED) {
        balance += order.size * order.price;
      } else if (order.side === OrderSide.CASH_IN) {
        balance += order.size * order.price;
      } else if (order.side === OrderSide.CASH_OUT) {
        balance -= order.size * order.price;
      }
    }

    return balance;
  }

  private async getUserInstruments(userId: number): Promise<InstrumentDetail[]> {
    const userOrders = await this.repository.find({
      where: { userid: userId, status: OrderState.FILLED },
      select: ['instrumentid', 'side', 'size', 'price']
    });

    const instrumentIds = new Set(userOrders.map(order => order.instrumentid));
    const instruments = await this.instrumentService.findByIds([...instrumentIds]);

    const userInstruments = [];

    for (const instrument of instruments) {
      const instrumentOrders = userOrders.filter(order => order.instrumentid === instrument.id);

      let totalQuantity = 0;
      let totalValue = 0;

      for (const order of instrumentOrders) {
        if (order.side === 'BUY') {
          totalQuantity += order.size;
          totalValue += order.size * order.price;
        } else if (order.side === 'SELL') {
          totalQuantity -= order.size;
          totalValue -= order.size * order.price;
        }
      }
      console.log({instrument})

      const marketData = await this.marketdataService.findOne(instrument.id);
      console.log({marketData})

      const currentValue = totalQuantity * (marketData?.close ?? 0);
      const performance = (currentValue - totalValue) / totalValue * 100;

      userInstruments.push({
        instrument: instrument.name,
        quantity: totalQuantity,
        totalValue: currentValue,
        performance: performance
      });
    }

    return userInstruments;
  }

  async findReportByUserId(userId: number): Promise<Balance> {
    const totalAmount = await this.getAccountBalance(userId);
    const instruments = await this.getUserInstruments(userId);

    return {
      totalAmount,
      instruments
    }
  }
}
