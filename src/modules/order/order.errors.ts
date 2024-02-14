export class OrderCanceledInsufficientInstrumentsError extends Error {
  constructor(ticker: string) {
    const message = `Order with ticker: ${ticker} canceled due to insufficient number of instruments.`;
    super(message);
  }
}

export class OrderCanceledInsufficientAmountError extends Error {
  constructor(ticker: string) {
    const message = `Order with ticker: ${ticker} canceled due to insufficient amount.`;
    super(message);
  }
}
