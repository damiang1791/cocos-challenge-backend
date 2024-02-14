import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { handleError } from '../../core/error/error';
import { UserPortfolio } from './user.types';
import { ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Search user.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  public async getUserAndAccount(
    @Param('userId') userId: number,
  ): Promise<UserPortfolio> {
    try {
      return await this.userService.getUserAndAccount(userId);
    } catch (error) {
      const message = `Error searching user for userId.`;
      return handleError(error, message);
    }
  }
}
