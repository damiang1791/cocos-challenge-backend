import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderEntity } from '../../core/entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstrumentModule } from '../instrument/instrument.module';
import { MarketdataModule } from '../marketdata/marketdata.module';

@Module({
  providers: [OrderService],
  imports: [TypeOrmModule.forFeature([OrderEntity]), InstrumentModule, MarketdataModule],
  exports: [OrderService],
})
export class OrderModule {}
