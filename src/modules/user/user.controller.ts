import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':userId')
  @HttpCode(200)
  public async getUserById(@Param('userId') userId: number) {
    try {
      return this.userService.getUserAndAccount(userId);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
