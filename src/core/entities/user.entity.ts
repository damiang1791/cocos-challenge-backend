import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'users',
})
@Index(['id'])
export class UserEntity {
  @PrimaryColumn({ type: 'integer', unique: true })
  id: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  accountnumber: string;
}
