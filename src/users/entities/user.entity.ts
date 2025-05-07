import { BaseEntity } from 'src/common/entities/base.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { Otp } from 'src/core/auth/otp/entities/otp.entity';
import { Profile } from 'src/users/profiles/entities/profile.entity';
import { Post } from 'src/contents/posts/entities/posts/post.entity';
import { Comment } from 'src/contents/comments/entities/comment.entity';
import { Reaction } from 'src/contents/reactions/entities/reaction.entity';
import { RefreshToken } from 'src/core/auth/entities/refresh-token.entity';

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

  @OneToMany(() => Post, (post) => post.user, {
    onDelete: 'CASCADE',
  })
  posts?: Post[];

  @OneToMany(() => Comment, (comment) => comment.user, {
    cascade: true,
  })
  comments?: Comment[];

  // Auth fields
  @OneToMany(() => Otp, (otp) => otp.user, {
    cascade: true,
  })
  otps?: Otp[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  refreshTokens?: RefreshToken[];

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    nullable: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  profile?: Profile;

  @OneToMany(() => Reaction, (reactions) => reactions.user, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  reactions?: Reaction[];
}
