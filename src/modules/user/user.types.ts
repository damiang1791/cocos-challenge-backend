import { IsString } from 'class-validator';
import { InstrumentDetail } from '../order/order.types';
import { ApiProperty } from '@nestjs/swagger';

const instrumentDetailExample = [
  {
    instrument: 'BMA',
    instrumentName: 'Banco Macro S.A.',
    quantity: -10,
    totalValue: -15028,
    performance: -0.4768211920529801,
  },
  {
    instrument: 'PAMP',
    instrumentName: 'Pampa Holding S.A.',
    quantity: 40,
    totalValue: 37034,
    performance: -0.1778975741239892,
  },
  {
    instrument: 'METR',
    instrumentName: 'MetroGAS S.A.',
    quantity: 500,
    totalValue: 114750,
    performance: -8.200000000000001,
  },
];
export class UserPortfolio {
  @ApiProperty({ required: true, example: 1 })
  userId: number;
  @ApiProperty({ required: true, example: '10001' })
  accountNumber: string;
  @ApiProperty({ required: true, example: 627500 })
  amountAvailable: number;
  @ApiProperty({ required: true, example: 764256 })
  totalAmount: number;
  @ApiProperty({ required: true, example: 136756 })
  totalAmountInstruments: number;
  @ApiProperty({
    required: true,
    example: instrumentDetailExample,
  })
  instruments: InstrumentDetail[];
}
