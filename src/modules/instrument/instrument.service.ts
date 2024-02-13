import { Injectable } from '@nestjs/common';
import { InstrumentEntity } from '../../core/entities/instrument.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InstrumentService {
  constructor(
    @InjectRepository(InstrumentEntity)
    private repository: Repository<InstrumentEntity>,
  ) {}

  findByIds(ids: number[]): Promise<InstrumentEntity[]> {
    return this.repository.findBy({id: In(ids)})
  }
}
