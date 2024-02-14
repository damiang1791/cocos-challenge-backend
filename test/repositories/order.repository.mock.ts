import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderEntity } from '../../src/core/entities/order.entity';

export const orderRepositoryMock = {
  findBy: jest.fn(),
  save: jest.fn(),
};

export const clearOrderRepositoryMocks = (): void => {
  Object.values(orderRepositoryMock).forEach((mockFunction) =>
    mockFunction.mockReset(),
  );
};

export const mockOrderRepository = (app: INestApplication) => {
  const orderRepository = app.get<Repository<OrderEntity>>(
    getRepositoryToken(OrderEntity),
  );

  Object.assign(orderRepository, orderRepositoryMock);
};
