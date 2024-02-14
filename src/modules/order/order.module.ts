import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderEntity } from '../../core/entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstrumentModule } from '../instrument/instrument.module';
import { MarketdataModule } from '../marketdata/marketdata.module';
import { OrderController } from './order.controller';

@Module({
  providers: [OrderService],
  imports: [TypeOrmModule.forFeature([OrderEntity]), InstrumentModule, MarketdataModule],
  exports: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
