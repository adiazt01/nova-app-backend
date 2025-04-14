import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'otps',
})
export class Otp extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  code: string;

  @ManyToOne(() => User, (user) => user.otps, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Column({
    type: 'boolean',
    default: false,
  })
  isUsed: boolean;
}
