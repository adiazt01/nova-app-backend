import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { Otp } from 'src/core/auth/otp/entities/otp.entity';
import { Profile } from 'src/profiles/entities/profile.entity';

@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  fullName: string;

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
    nullable: false,
  })
  role: UserRole;

  // Authentication fields
  @OneToMany(() => Otp, (otp) => otp.user, {
    cascade: true,
    eager: true,
  })
  otps?: Otp[];

  // Profile fields
  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  profile?: Profile;
}
