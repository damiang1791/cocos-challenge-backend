import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserNotFoundError } from '../../modules/user/user.errors';
import {
  OrderCanceledInsufficientAmountError,
  OrderCanceledInsufficientInstrumentsError,
} from '../../modules/order/order.errors';

export async function handleError(error: Error, message: string): Promise<any> {
  switch (error.constructor) {
    case UserNotFoundError:
      return Promise.reject(
        new NotFoundException(`${message} ${error.message}`),
      );
    case OrderCanceledInsufficientInstrumentsError:
      return Promise.reject(
        new BadRequestException(`${message} ${error.message}`),
      );
    case OrderCanceledInsufficientAmountError:
      return Promise.reject(
        new BadRequestException(`${message} ${error.message}`),
      );
    default:
      return Promise.reject(
        new InternalServerErrorException(`${message} ${error.message}`),
      );
  }
}
