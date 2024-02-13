import { Module } from '@nestjs/common';
import { MarketdataService } from './marketdata.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketdataEntity } from '../../core/entities/marketdata.entity';

@Module({
  providers: [MarketdataService],
  imports: [TypeOrmModule.forFeature([MarketdataEntity])],
  exports: [MarketdataService]
})
export class MarketdataModule {}
