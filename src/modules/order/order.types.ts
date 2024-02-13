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

export interface InstrumentDetail {
  instrument: string,
  quantity: number,
  totalValue: number,
  performance: number
}

export interface Balance {
  totalAmount: number,
  instruments: InstrumentDetail[]
}
