import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'marketdata',
})
@Index(['id'])
export class MarketdataEntity {
  @PrimaryColumn({ type: 'integer', unique: true })
  id: number;

  @Column({ type: 'integer' })
  instrumentid: number;

  @Column({ type: 'float' })
  high: number;

  @Column({ type: 'float' })
  low: number;

  @Column({ type: 'float' })
  open: number;

  @Column({ type: 'float', nullable: true })
  close: number;

  @Column({ type: 'float' })
  previousclose: number;

  @Column({ type: 'timestamptz', default: 'CURRENT_TIMESTAMP' })
  date: Date;
}
