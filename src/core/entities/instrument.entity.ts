import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'instruments',
})
@Index(['id'])
export class InstrumentEntity {
  @PrimaryColumn({ type: 'integer', unique: true })
  id: number;

  @Column({ type: 'varchar' })
  ticker: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  type: string;
}
