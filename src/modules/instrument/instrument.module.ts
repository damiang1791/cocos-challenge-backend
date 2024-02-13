import { Module } from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { InstrumentEntity } from '../../core/entities/instrument.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [InstrumentService],
  imports: [TypeOrmModule.forFeature([InstrumentEntity])],
  exports: [InstrumentService]
})
export class InstrumentModule {}
