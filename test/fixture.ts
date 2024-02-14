import {
  InstrumentDetail,
  TotalBalance,
} from '../src/modules/order/order.types';
import { UserEntity } from '../src/core/entities/user.entity';
import { InstrumentEntity } from 'src/core/entities/instrument.entity';
import { OrderEntity } from 'src/core/entities/order.entity';
import { MarketdataEntity } from 'src/core/entities/marketdata.entity';

export const DATE_MOCK = new Date();

export const USER_MOCK: UserEntity = {
  id: 1,
  email: 'damianGarcia@gmail.com',
  accountnumber: '00001',
};

export const INSTRUMENT_BYMA_MOCK: InstrumentEntity = {
  id: 65,
  ticker: 'BYMA',
  name: 'Bolsas y Mercados Argentinos S.A.',
  type: 'ACCIONES',
};

export const INSTRUMENT_CADO_MOCK: InstrumentEntity = {
  id: 38,
  ticker: 'CADO',
  name: 'Carlos Casado',
  type: 'ACCIONES',
};

export const ORDER_MOCK: OrderEntity = {
  id: 12,
  userid: 2,
  size: 10,
  type: 'MARKET',
  side: 'BUY',
  datetime: DATE_MOCK,
  instrumentid: 65,
  price: 369.5,
  status: 'FILLED',
};

export const MARKETDATA_MOCK: MarketdataEntity = {
  id: 123,
  instrumentid: 65,
  high: 10.5,
  low: 8.5,
  open: 9,
  close: 10,
  previousclose: 8,
  date: DATE_MOCK,
};

export const INSTRUMENTDETAIL_MOCK: InstrumentDetail = {
  instrument: 'BYMA',
  instrumentName: 'Bolsas y Mercados Argentinos S.A.',
  quantity: 20,
  totalValue: 15028,
  performance: 5.56,
};

export const TOTALBALANCE_MOCK: TotalBalance = {
  totalAmountInstruments: 15028,
  amountAvailable: 10089,
  instruments: [INSTRUMENTDETAIL_MOCK],
};
