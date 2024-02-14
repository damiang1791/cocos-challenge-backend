import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { handleError } from '../../core/error/error';
import { InstrumentService } from './instrument.service';
import { InstrumentEntity } from '../../core/entities/instrument.entity';

@Controller('instrument')
export class InstrumentController {
  constructor(private instrumentService: InstrumentService) {}

  @Get()
  @HttpCode(200)
  public async getInstrument(
    @Query('query') query: string = '',
  ): Promise<InstrumentEntity[]> {
    try {
      return await this.instrumentService.getInstrument(query);
    } catch (error) {
      const message = `Error searching instrument for name or ticker.`;
      return handleError(error, message);
    }
  }
}
