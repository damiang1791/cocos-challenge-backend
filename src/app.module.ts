import { Module } from '@nestjs/common';
import { CocosConfigModule } from './config';
import { DbModule } from './core/db/db.module';
import { HealthController } from './core/health/health.controller';
import { UserModule } from './modules/user/user.module';
import { OrderModule } from './modules/order/order.module';
import { InstrumentModule } from './modules/instrument/instrument.module';
import { MarketdataModule } from './modules/marketdata/marketdata.module';

@Module({
  imports: [
    CocosConfigModule,
    DbModule,
    InstrumentModule,
    UserModule,
    OrderModule,
    MarketdataModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
