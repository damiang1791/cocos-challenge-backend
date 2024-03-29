import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../core/entities/user.entity';
import { Repository } from 'typeorm';
import { UserPortfolio } from './user.types';
import { OrderService } from '../order/order.service';
import { UserNotFoundError } from './user.errors';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private orderService: OrderService,
  ) {}

  async getUserById(userId: number): Promise<UserEntity> {
    const user = await this.repository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError(userId);
    }

    return user;
  }

  async getUserAndAccount(userId: number): Promise<UserPortfolio> {
    const { id, accountnumber } = await this.getUserById(userId);

    const { totalAmountInstruments, amountAvailable, instruments } =
      await this.orderService.findReportByUserId(userId);

    return {
      userId: id,
      accountNumber: accountnumber,
      totalAmount: totalAmountInstruments + amountAvailable,
      amountAvailable,
      totalAmountInstruments,
      instruments,
    };
  }
}
