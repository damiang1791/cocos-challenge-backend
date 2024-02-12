export interface instrument {
  id: number;
  ticker: string;
  name: string;
  type: string;
  totalReturn: number;
}

export interface UserPortfolio {
  userId: number;
  accountNumber: string;
  totalAmount: number;
  instruments: instrument[];
}
