import { INestApplication } from '@nestjs/common';
import { mockUserRepository } from './user.repository.mock';
import { mockOrderRepository } from './order.repository.mock';
import { mockInstrumentRepository } from './instrument.repository.mock';
import { mockMarketRepository } from './marketdata.repository.mock';

export const mockRepositories = (app: INestApplication) => {
  mockUserRepository(app);
  mockOrderRepository(app);
  mockInstrumentRepository(app);
  mockMarketRepository(app);
};
