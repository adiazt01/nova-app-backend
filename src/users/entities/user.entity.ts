import { BaseEntity } from 'src/common/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { Otp } from 'src/core/auth/otp/entities/otp.entity';
import { Profile } from 'src/users/profiles/entities/profile.entity';
import { Post } from 'src/posts/entities/post.entity';

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
    select: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
    nullable: false,
    select: false,
  })
  role: UserRole;

  // Feed
  @OneToMany(() => Post, (post) => post.user, {
    onDelete: 'CASCADE',
  })
  posts?: Post[];

  // Authentication fields
  @OneToMany(() => Otp, (otp) => otp.user, {
    cascade: true,
  })
  otps?: Otp[];

  // Profile fields
  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  profile?: Profile;
}
