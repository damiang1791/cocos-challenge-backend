import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { handleError } from '../../core/error/error';
import { UserPortfolio } from './user.types';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':userId')
  @HttpCode(200)
  public async getUserById(
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
