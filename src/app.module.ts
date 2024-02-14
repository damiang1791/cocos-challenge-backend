import { Module } from '@nestjs/common';
import { CocosConfigModule } from './config';
import { DbModule } from './core/db/db.module';
import { HealthController } from './core/health/health.controller';
import { UserModule } from './modules/user/user.module';
import { OrderModule } from './modules/order/order.module';
import { InstrumentModule } from './modules/instrument/instrument.module';

@Module({
  imports: [
    CocosConfigModule,
    DbModule,
    InstrumentModule,
    UserModule,
    OrderModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
