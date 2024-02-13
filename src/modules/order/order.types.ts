export enum OrderState {
  NEW = 'NEW',
  FILLED = 'FILLED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL',
  CASH_IN = 'CASH_IN',
  CASH_OUT = 'CASH_OUT',
}

export interface AccountBalance {
  cash: number;
  balance: number;
}

export interface InstrumentDetail {
  instrument: string;
  instrumentName: string;
  quantity: number;
  totalValue: number;
  performance: number;
}

export interface Balance {
  totalAmountInstruments: number;
  instruments: InstrumentDetail[];
}

export interface TotalBalance {
  totalAmountInstruments: number;
  amountAvailable: number;
  instruments: InstrumentDetail[];
}
