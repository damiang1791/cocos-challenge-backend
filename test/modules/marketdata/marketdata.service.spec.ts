import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MarketdataService } from '../../../src/modules/marketdata/marketdata.service';
import { MarketdataEntity } from '../../../src/core/entities/marketdata.entity';
import { MARKETDATA_MOCK } from '../../../test/fixture';

describe('MarketdataService', () => {
  let service: MarketdataService;
  const marketdataEntityMock = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MarketdataService,
        {
          provide: getRepositoryToken(MarketdataEntity),
          useValue: marketdataEntityMock,
        },
      ],
    }).compile();

    service = module.get<MarketdataService>(MarketdataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return marketdata a instrument', async () => {
      marketdataEntityMock.findOne.mockResolvedValue(MARKETDATA_MOCK);
      const resp = await service.findOne(123);
      expect(resp.instrumentid).toEqual(65);
    });
    it('should return error', async () => {
      marketdataEntityMock.findOne.mockRejectedValueOnce(
        new Error('Test error.'),
      );
      await expect(service.findOne(123)).rejects.toThrow(Error);
    });
  });
});
