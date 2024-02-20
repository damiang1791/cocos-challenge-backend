import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

class health {
  @ApiProperty({ example: 104.367819291 })
  uptime: number;
}
@Controller('/health')
@ApiTags('health')
export class HealthController {
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Health.',
    type: health,
  })
  getHealthCheck() {
    return { uptime: process.uptime() };
  }
}
