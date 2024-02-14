import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateOrderDto } from './order.types';
import { OrderService } from './order.service';
import { handleError } from '../../core/error/error';
import { OrderEntity } from '../../core/entities/order.entity';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create order.',
  })
  public async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<OrderEntity> {
    try {
      return await this.orderService.createOrder(createOrderDto);
    } catch (error) {
      const message = `Error searching user for userId.`;
      return handleError(error, message);
    }
  }
}
