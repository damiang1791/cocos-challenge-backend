import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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

export enum OrderSideOperation {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum OrderType {
  MARKET = 'MARKET',
  LIMITE = 'LIMITE',
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

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true, example: 1 })
  readonly userId: number;

  @IsNotEmpty()
  @IsEnum(OrderSideOperation)
  @ApiProperty({
    required: true,
    enum: OrderSideOperation,
    enumName: 'OrderSideOperation',
  })
  readonly side: OrderSideOperation;

  @IsNotEmpty()
  @IsEnum(OrderType)
  @ApiProperty({ required: true, enum: OrderType, enumName: 'OrderType' })
  readonly type: OrderType;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: 'random@modo.com.ar' })
  readonly ticker: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true, example: 123 })
  readonly size: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false, example: 123.45 })
  readonly limitPrice: number;
}
