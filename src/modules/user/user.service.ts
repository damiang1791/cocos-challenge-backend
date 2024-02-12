import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../core/entities/user.entity';
import { Repository } from 'typeorm';
import { UserPortfolio } from './user.types';
import { OrderService } from '../order/order.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private orderService: OrderService,
  ) {}

  async getUserById(userId: number): Promise<UserEntity> {
    return this.repository.findOneBy({ id: userId });
  }

  // Portfolio: La respuesta deberá devolver el valor total de la cuenta de un usuario,
  // sus pesos disponibles para operar el listado de activos que posee
  // (incluyendo cantidad de acciones, el valor total monetario de la posición ($)
  // y el rendimiento total (%)).

  async getUserAndAccount(userId: number): Promise<UserPortfolio> {
    const user = await this.repository.findOneBy({ id: userId });

    const report = this.orderService;

    const totalAmount = 0;
    const instruments = 0;

    const resp: UserPortfolio = {
      userId: user.id,
      accountNumber: user.accountnumber,
      totalAmount,
      instruments,
    };

    return resp;
  }
}
