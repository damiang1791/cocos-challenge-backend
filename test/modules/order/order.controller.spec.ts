import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../../../src/modules/order/order.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderEntity } from '../../../src/core/entities/order.entity';
import { InstrumentEntity } from '../../../src/core/entities/instrument.entity';
import { MarketdataEntity } from '../../../src/core/entities/marketdata.entity';
import { UserEntity } from '../../../src/core/entities/user.entity';
import { OrderService } from '../../../src/modules/order/order.service';
import { UserService } from '../../../src/modules/user/user.service';
import { InstrumentService } from '../../../src/modules/instrument/instrument.service';
import { MarketdataService } from '../../../src/modules/marketdata/marketdata.service';
import {
  CreateOrderDto,
  OrderSideOperation,
  OrderType,
} from '../../../src/modules/order/order.types';
import {
  INSTRUMENT_BYMA_MOCK,
  MARKETDATA_MOCK,
  ORDER_MOCK,
} from '../../../test/fixture';

describe('OrderController', () => {
  let controller: OrderController;
  let userService: UserService;
  const orderEntityMock = {
    findBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };
  const instrumentEntityMock = {
    findBy: jest.fn(),
    findOneBy: jest.fn(),
  };
  const marketdataEntityMock = {
    findOne: jest.fn(),
  };
  const userEntityMock = {
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(OrderEntity),
          useValue: orderEntityMock,
        },
        {
          provide: UserService,
          useValue: {
            getUserById: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: userEntityMock,
        },
        InstrumentService,
        {
          provide: getRepositoryToken(InstrumentEntity),
          useValue: instrumentEntityMock,
        },
        MarketdataService,
        {
          provide: getRepositoryToken(MarketdataEntity),
          useValue: marketdataEntityMock,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createOrder', () => {
    const body: CreateOrderDto = {
      userId: 2,
      side: OrderSideOperation.BUY,
      type: OrderType.LIMITE,
      ticker: 'BYMA',
      size: 1,
      limitPrice: 100,
    };
    it('should return a new order', async () => {
      orderEntityMock.findBy.mockResolvedValue([ORDER_MOCK]);
      const RESP_MOCK = {
        id: 123,
        userid: 2,
        size: 1,
        type: 'LIMITE',
        side: 'BUY',
        datetime: new Date(),
        instrumentid: 65,
        price: 10,
        status: 'FILLED',
      };
      orderEntityMock.create.mockResolvedValue(RESP_MOCK);
      orderEntityMock.save.mockResolvedValue(RESP_MOCK);
      instrumentEntityMock.findBy.mockResolvedValue([INSTRUMENT_BYMA_MOCK]);
      instrumentEntityMock.findOneBy.mockResolvedValue(INSTRUMENT_BYMA_MOCK);
      marketdataEntityMock.findOne.mockResolvedValue(MARKETDATA_MOCK);

      const newOrder = await controller.createOrder(body);
      expect(newOrder.type).toEqual(OrderType.LIMITE);
      expect(newOrder.side).toEqual(OrderSideOperation.BUY);
    });
    it('should return error', async () => {
      orderEntityMock.findBy.mockRejectedValueOnce(new Error('Test error.'));
      await expect(controller.createOrder(body)).rejects.toThrow(Error);
    });
  });
});
