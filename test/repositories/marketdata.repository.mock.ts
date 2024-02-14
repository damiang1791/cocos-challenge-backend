import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MarketdataEntity } from '../../src/core/entities/marketdata.entity';

export const marketdataRepositoryMock = {
  findOne: jest.fn(),
};

export const clearMarketRepositoryMocks = (): void => {
  Object.values(marketdataRepositoryMock).forEach((mockFunction) =>
    mockFunction.mockReset(),
  );
};

export const mockMarketRepository = (app: INestApplication) => {
  const marketdataRepository = app.get<Repository<MarketdataEntity>>(
    getRepositoryToken(MarketdataEntity),
  );

  Object.assign(marketdataRepository, marketdataRepositoryMock);
};
