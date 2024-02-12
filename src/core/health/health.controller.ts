import { Controller, Get } from '@nestjs/common';

@Controller('/health')
export class HealthController {
  @Get()
  getHealthCheck() {
    return { uptime: process.uptime() };
  }
}
