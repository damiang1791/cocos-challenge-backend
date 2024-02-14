import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../../src/modules/user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../../src/core/entities/user.entity';
import { OrderService } from '../../../src/modules/order/order.service';
import { OrderEntity } from '../../../src/core/entities/order.entity';
import { InstrumentService } from '../../../src/modules/instrument/instrument.service';
import { MarketdataService } from '../../../src/modules/marketdata/marketdata.service';
import { InstrumentEntity } from '../../../src/core/entities/instrument.entity';
import { MarketdataEntity } from '../../../src/core/entities/marketdata.entity';
import { TOTALBALANCE_MOCK, USER_MOCK } from '../../fixture';
import { UserNotFoundError } from '../../../src/modules/user/user.errors';

describe('UserService', () => {
  let service: UserService;
  const userMock_FindOneBy = jest.fn();
  let orderService: OrderService;
  const orderMock_FindReportByUserId = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOneBy: userMock_FindOneBy,
          },
        },
        {
          provide: OrderService,
          useValue: {
            findReportByUserId: orderMock_FindReportByUserId,
          },
        },
        {
          provide: getRepositoryToken(OrderEntity),
          useValue: {},
        },
        InstrumentService,
        {
          provide: getRepositoryToken(InstrumentEntity),
          useValue: {},
        },
        MarketdataService,
        {
          provide: getRepositoryToken(MarketdataEntity),
          useValue: {},
        },
      ],
    }).compile();

    service = await module.resolve<UserService>(UserService);
    orderService = await module.resolve<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserById', () => {
    const userId = 1;
    it('should return an user', async () => {
      userMock_FindOneBy.mockResolvedValueOnce(USER_MOCK);
      const user = await service.getUserById(userId);
      expect(user).toEqual(USER_MOCK);
    });
    it('should return not found user', async () => {
      userMock_FindOneBy.mockRejectedValueOnce(new UserNotFoundError(userId));
      await expect(service.getUserById(userId)).rejects.toThrow(
        UserNotFoundError,
      );
    });
  });

  describe('getUserAndAccount', () => {
    const userId = 1;
    it('should return an user and account', async () => {
      userMock_FindOneBy.mockResolvedValueOnce(USER_MOCK);
      orderMock_FindReportByUserId.mockResolvedValueOnce(TOTALBALANCE_MOCK);
      const userAndAccount = await service.getUserAndAccount(userId);
      expect(userAndAccount).toEqual({
        accountNumber: '00001',
        amountAvailable: 10089,
        instruments: [
          {
            instrument: 'BYMA',
            instrumentName: 'Bolsas y Mercados Argentinos S.A.',
            performance: 5.56,
            quantity: 20,
            totalValue: 15028,
          },
        ],
        totalAmount: 25117,
        totalAmountInstruments: 15028,
        userId: 1,
      });
    });

    it('should return not found user', async () => {
      userMock_FindOneBy.mockRejectedValueOnce(new UserNotFoundError(userId));
      await expect(service.getUserAndAccount(userId)).rejects.toThrow(
        UserNotFoundError,
      );
    });
  });
});
