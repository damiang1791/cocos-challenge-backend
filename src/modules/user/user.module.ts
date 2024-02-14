import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../core/entities/user.entity';
import { OrderModule } from '../order/order.module';
import { OrderService } from '../order/order.service';
import { OrderEntity } from '../../core/entities/order.entity';
import { InstrumentService } from '../instrument/instrument.service';
import { MarketdataService } from '../marketdata/marketdata.service';
import { InstrumentEntity } from '../../core/entities/instrument.entity';
import { MarketdataEntity } from '../../core/entities/marketdata.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, OrderService, InstrumentService, MarketdataService],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      OrderEntity,
      InstrumentEntity,
      MarketdataEntity,
    ]),
  ],
  exports: [UserService],
})
export class UserModule {}
