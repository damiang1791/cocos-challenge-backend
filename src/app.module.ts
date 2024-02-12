import { Module } from '@nestjs/common';
import { CocosConfigModule } from './config';
import { DbModule } from './core/db/db.module';
import { HealthController } from './core/health/health.controller';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [CocosConfigModule, DbModule, UserModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
