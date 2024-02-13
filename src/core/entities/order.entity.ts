import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'orders',
})
@Index(['id'])
export class OrderEntity {
  @PrimaryColumn({ type: 'integer', unique: true })
  id: number;

  @Column({ type: 'integer' })
  instrumentid: number;

  @Column({ type: 'integer' })
  userid: number;

  @Column({ type: 'integer' })
  size: number;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'varchar' })
  side: string;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'timestamptz', default: 'CURRENT_TIMESTAMP' })
  datetime: Date;
}
