import { Injectable } from '@nestjs/common';
import { InstrumentEntity } from '../../core/entities/instrument.entity';
import { ILike, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InstrumentService {
  constructor(
    @InjectRepository(InstrumentEntity)
    private repository: Repository<InstrumentEntity>,
  ) {}

  findByIds(ids: number[]): Promise<InstrumentEntity[]> {
    return this.repository.findBy({ id: In(ids) });
  }

  getInstrument(query: string): Promise<InstrumentEntity[]> {
    return this.repository.find({
      where: [{ ticker: ILike(`%${query}%`) }, { name: ILike(`%${query}%`) }],
    });
  }

  getInstrumentByTicker(ticker: string): Promise<InstrumentEntity> {
    return this.repository.findOneBy({ ticker });
  }
}
