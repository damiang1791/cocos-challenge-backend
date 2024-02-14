import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InstrumentService } from '../../../src/modules/instrument/instrument.service';
import { InstrumentEntity } from '../../../src/core/entities/instrument.entity';
import { INSTRUMENT_BYMA_MOCK } from '../../../test/fixture';

describe('InstrumentService', () => {
  let service: InstrumentService;
  const instrumentEntityMock = {
    findBy: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstrumentService,
        {
          provide: getRepositoryToken(InstrumentEntity),
          useValue: instrumentEntityMock,
        },
      ],
    }).compile();

    service = module.get<InstrumentService>(InstrumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return marketdata a instrument', async () => {
      instrumentEntityMock.findBy.mockResolvedValue([INSTRUMENT_BYMA_MOCK]);
      const resp = await service.findByIds([123]);
      expect(resp[0]).toEqual(INSTRUMENT_BYMA_MOCK);
    });
    it('should return error', async () => {
      instrumentEntityMock.findBy.mockRejectedValueOnce(
        new Error('Test error.'),
      );
      await expect(service.findByIds([123])).rejects.toThrow(Error);
    });
  });

  describe('getInstrument', () => {
    const query = 'BYMA';
    it('should return marketdata a instrument', async () => {
      instrumentEntityMock.find.mockResolvedValue([INSTRUMENT_BYMA_MOCK]);
      const resp = await service.getInstrument(query);
      expect(resp[0]).toEqual(INSTRUMENT_BYMA_MOCK);
    });
    it('should return error', async () => {
      instrumentEntityMock.find.mockRejectedValueOnce(new Error('Test error.'));
      await expect(service.getInstrument(query)).rejects.toThrow(Error);
    });
  });

  describe('getInstrumentByTicker', () => {
    const ticker = 'BYMA';
    it('should return marketdata a instrument', async () => {
      instrumentEntityMock.findOneBy.mockResolvedValue(INSTRUMENT_BYMA_MOCK);
      const resp = await service.getInstrumentByTicker(ticker);
      expect(resp).toEqual(INSTRUMENT_BYMA_MOCK);
    });
    it('should return error', async () => {
      instrumentEntityMock.findOneBy.mockRejectedValueOnce(
        new Error('Test error.'),
      );
      await expect(service.getInstrumentByTicker(ticker)).rejects.toThrow(
        Error,
      );
    });
  });
});
