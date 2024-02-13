import { InstrumentDetail } from "../order/order.types";

export interface UserPortfolio {
  userId: number;
  accountNumber: string;
  totalAmount: number;
  instruments: InstrumentDetail[];
}
