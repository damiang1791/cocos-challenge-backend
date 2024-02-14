import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../core/entities/user.entity';
import { OrderService } from '../order/order.service';
import { OrderEntity } from '../../core/entities/order.entity';
import { InstrumentService } from '../instrument/instrument.service';
import { MarketdataService } from '../marketdata/marketdata.service';
import { InstrumentEntity } from '../../core/entities/instrument.entity';
import { MarketdataEntity } from '../../core/entities/marketdata.entity';

describe('UserService', () => {
  let service: UserService;
  const findOneByMock = jest.fn();
  const findByMock = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOneBy: findOneByMock,
            findBy: findByMock,
          },
        },
        OrderService,
        {
          provide: getRepositoryToken(OrderEntity),
          useValue: {
            findOneBy: findOneByMock,
            findBy: findByMock,
          },
        },
        InstrumentService,
        {
          provide: getRepositoryToken(InstrumentEntity),
          useValue: {
            findOneBy: findOneByMock,
            findBy: findByMock,
          },
        },
        MarketdataService,
        {
          provide: getRepositoryToken(MarketdataEntity),
          useValue: {
            findOneBy: findOneByMock,
            findBy: findByMock,
          },
        },
      ],
    }).compile();

    service = await module.resolve<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
