import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InstrumentEntity } from '../../src/core/entities/instrument.entity';

export const instrumentRepositoryMock = {
  findByIds: jest.fn(),
  find: jest.fn(),
};

export const clearInstrumentRepositoryMocks = (): void => {
  Object.values(instrumentRepositoryMock).forEach((mockFunction) =>
    mockFunction.mockReset(),
  );
};

export const mockInstrumentRepository = (app: INestApplication) => {
  const instrumentRepository = app.get<Repository<InstrumentEntity>>(
    getRepositoryToken(InstrumentEntity),
  );

  Object.assign(instrumentRepository, instrumentRepositoryMock);
};
