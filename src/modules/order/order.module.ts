import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderEntity } from '../../core/entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [OrderService],
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  exports: [OrderService],
})
export class OrderModule {}
