import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../../core/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private repository: Repository<OrderEntity>,
  ) {}

  findOrdersByUserId(userId: number): Promise<OrderEntity[]> {
    return this.repository.findBy({ userId });
  }

  async getAccountBalance(userId: number): Promise<number> {
    const orders = await this.findOrdersByUserId(userId);

    let balance = 0;
    for (const order of orders) {
      if (
        order.side === 'BUY' &&
        (order.status === 'FILLED' || order.status === 'NEW')
      ) {
        balance -= order.size * order.price;
      } else if (order.side === 'SELL' && order.status === 'FILLED') {
        balance += order.size * order.price;
      } else if (order.side === 'CASH_IN' || order.side === 'CASH_OUT') {
        balance += order.size * order.price;
      }
    }

    return balance;
  }

  async findReportByUserId(userId: number) {}
}
