import { Module, forwardRef } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderEntity } from '../../core/entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstrumentModule } from '../instrument/instrument.module';
import { MarketdataModule } from '../marketdata/marketdata.module';
import { OrderController } from './order.controller';
import { UserService } from '../user/user.service';
import { UserEntity } from '../../core/entities/user.entity';
import { InstrumentEntity } from '../../core/entities/instrument.entity';
import { MarketdataEntity } from '../../core/entities/marketdata.entity';
import { InstrumentService } from '../instrument/instrument.service';
import { MarketdataService } from '../marketdata/marketdata.service';

@Module({
  providers: [OrderService, UserService, InstrumentService, MarketdataService],
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      UserEntity,
      InstrumentEntity,
      MarketdataEntity,
    ]),
  ],
  exports: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
