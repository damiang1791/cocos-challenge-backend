import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { mockRepositories } from './repositories';
import {
  clearUserRepositoryMocks,
  userRepositoryMock,
} from './repositories/user.repository.mock';
import {
  DATE_MOCK,
  INSTRUMENT_BYMA_MOCK,
  INSTRUMENT_CADO_MOCK,
  MARKETDATA_MOCK,
  ORDER_MOCK,
  USER_MOCK,
} from './fixture';
import {
  clearOrderRepositoryMocks,
  orderRepositoryMock,
} from './repositories/order.repository.mock';
import {
  clearInstrumentRepositoryMocks,
  instrumentRepositoryMock,
} from './repositories/instrument.repository.mock';
import {
  clearMarketRepositoryMocks,
  marketdataRepositoryMock,
} from './repositories/marketdata.repository.mock';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    mockRepositories(app);
  });

  afterAll(() => {
    clearUserRepositoryMocks();
    clearOrderRepositoryMocks();
    clearInstrumentRepositoryMocks();
    clearMarketRepositoryMocks();
    app.close();
  });

  describe('user.controller', () => {
    const userId = 1;
    it('should return an user and account', () => {
      const resp = {
        userId: 1,
        accountNumber: '00001',
        totalAmount: -3595,
        amountAvailable: -3695,
        totalAmountInstruments: 100,
        instruments: [
          {
            instrument: 'BYMA',
            instrumentName: 'Bolsas y Mercados Argentinos S.A.',
            quantity: 10,
            totalValue: 100,
            performance: -97.2936400541272,
          },
        ],
      };
      userRepositoryMock.findOneBy.mockResolvedValue(USER_MOCK);
      orderRepositoryMock.findBy.mockResolvedValue([ORDER_MOCK]);
      instrumentRepositoryMock.findByIds.mockResolvedValue([
        INSTRUMENT_BYMA_MOCK,
      ]);
      marketdataRepositoryMock.findOne.mockResolvedValue(MARKETDATA_MOCK);
      const url = `/user/${userId}`;
      return request(app.getHttpServer()).get(url).expect(200).expect(resp);
    });
  });

  describe('instrument.controller', () => {
    const query = 'cad';
    it('should return an instrument', () => {
      const resp = [
        {
          id: 38,
          ticker: 'CADO',
          name: 'Carlos Casado',
          type: 'ACCIONES',
        },
        {
          id: 65,
          ticker: 'BYMA',
          name: 'Bolsas y Mercados Argentinos S.A.',
          type: 'ACCIONES',
        },
      ];
      instrumentRepositoryMock.find.mockResolvedValueOnce([
        INSTRUMENT_CADO_MOCK,
        INSTRUMENT_BYMA_MOCK,
      ]);
      const url = `/instrument?query${query}`;
      return request(app.getHttpServer()).get(url).expect(200).expect(resp);
    });
  });

  describe('order.controller', () => {
    it('should create a new order of type MARKET', async () => {
      const RESP_MOCK = {
        id: 123,
        userid: 2,
        size: 1,
        type: 'MARKET',
        side: 'BUY',
        datetime: DATE_MOCK,
        instrumentid: 65,
        price: 10,
        status: 'FILLED',
      };
      userRepositoryMock.findOneBy.mockResolvedValue(USER_MOCK);
      orderRepositoryMock.findBy.mockResolvedValue([ORDER_MOCK]);
      orderRepositoryMock.save.mockResolvedValue(RESP_MOCK);
      instrumentRepositoryMock.findByIds.mockResolvedValue([
        INSTRUMENT_BYMA_MOCK,
      ]);
      instrumentRepositoryMock.find.mockResolvedValueOnce([
        INSTRUMENT_CADO_MOCK,
        INSTRUMENT_BYMA_MOCK,
      ]);
      const url = `/order`;
      const body = {
        userId: 2,
        side: 'BUY',
        type: 'MARKET',
        ticker: 'BYMA',
        size: 1,
      };
      const resp = await request(app.getHttpServer())
        .post(url)
        .send(body)
        .expect(201);

      expect(resp.body.userid).toEqual(body.userId);
      expect(resp.body.side).toEqual(body.side);
    });
    it('should create a new order of type LIMITE', async () => {
      const RESP_MOCK = {
        id: 123,
        userid: 2,
        size: 1,
        type: 'LIMITE',
        side: 'BUY',
        datetime: DATE_MOCK,
        instrumentid: 65,
        price: 10,
        status: 'FILLED',
      };
      userRepositoryMock.findOneBy.mockResolvedValue(USER_MOCK);
      orderRepositoryMock.findBy.mockResolvedValue([ORDER_MOCK]);
      orderRepositoryMock.save.mockResolvedValue(RESP_MOCK);
      instrumentRepositoryMock.findByIds.mockResolvedValue([
        INSTRUMENT_BYMA_MOCK,
      ]);
      instrumentRepositoryMock.find.mockResolvedValueOnce([
        INSTRUMENT_CADO_MOCK,
        INSTRUMENT_BYMA_MOCK,
      ]);
      const url = `/order`;
      const body = {
        userId: 2,
        side: 'BUY',
        type: 'LIMITE',
        ticker: 'BYMA',
        size: 1,
        limitPrice: 100,
      };
      const resp = await request(app.getHttpServer())
        .post(url)
        .send(body)
        .expect(201);

      expect(resp.body.userid).toEqual(body.userId);
      expect(resp.body.side).toEqual(body.side);
    });
  });
});
