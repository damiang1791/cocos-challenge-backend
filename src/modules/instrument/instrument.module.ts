import { Module } from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { InstrumentEntity } from '../../core/entities/instrument.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstrumentController } from './instrument.controller';

@Module({
  providers: [InstrumentService],
  imports: [TypeOrmModule.forFeature([InstrumentEntity])],
  exports: [InstrumentService],
  controllers: [InstrumentController]
})
export class InstrumentModule {}
