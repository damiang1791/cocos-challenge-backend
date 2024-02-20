import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { handleError } from '../../core/error/error';
import { InstrumentService } from './instrument.service';
import { InstrumentEntity } from '../../core/entities/instrument.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('instrument')
@ApiTags('instrument')
export class InstrumentController {
  constructor(private instrumentService: InstrumentService) {}

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Search instrument.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Instrument not found.',
  })
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
