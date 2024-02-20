import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'orders',
})
@Index(['id'])
export class OrderEntity {
  @PrimaryColumn({ type: 'integer', unique: true })
  @ApiProperty({ example: 2 })
  id: number;

  @Column({ type: 'integer' })
  @ApiProperty({ example: 65 })
  instrumentid: number;

  @Column({ type: 'integer' })
  @ApiProperty({ example: 2 })
  userid: number;

  @Column({ type: 'integer' })
  @ApiProperty({ example: 10 })
  size: number;

  @Column({ type: 'float' })
  @ApiProperty({ example: '369.50' })
  price: number;

  @Column({ type: 'varchar' })
  @ApiProperty({ example: 'MARKET' })
  type: string;

  @Column({ type: 'varchar' })
  @ApiProperty({ example: 'BUY' })
  side: string;

  @Column({ type: 'varchar' })
  @ApiProperty({ example: 'FILLED' })
  status: string;

  @Column({ type: 'timestamptz', default: 'CURRENT_TIMESTAMP' })
  @ApiProperty({ example: '2024-02-20T03:33:48.422Z' })
  datetime: Date;
}
