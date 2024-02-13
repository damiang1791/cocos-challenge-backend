import { InstrumentDetail } from '../order/order.types';

export interface UserPortfolio {
  userId: number;
  accountNumber: string;
  amountAvailable: number;
  totalAmount: number;
  totalAmountInstruments: number;
  instruments: InstrumentDetail[];
}
