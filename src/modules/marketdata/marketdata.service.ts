import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MarketdataEntity } from '../../core/entities/marketdata.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class MarketdataService {
  constructor(
    @InjectRepository(MarketdataEntity)
    private repository: Repository<MarketdataEntity>,
  ) {}

  findOne(instrumentid: number): Promise<MarketdataEntity> {
    return this.repository.findOne({
      where: { instrumentid },
      order: { date: 'DESC' }
    })
  }
}
