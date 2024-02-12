import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

export enum OrderState {
  NEW = 'NEW',
  FILLED = 'FILLED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

@Entity({
  name: 'orders',
})
@Index(['id'])
export class OrderEntity {
  @PrimaryColumn({ type: 'integer', unique: true })
  id: number;

  @Column({ type: 'integer' })
  instrumentId: number;

  @Column({ type: 'integer' })
  userId: number;

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
