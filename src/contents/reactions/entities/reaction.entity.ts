import { BaseEntity } from "src/common/entities/base.entity";
import { TargetEntity } from "src/common/enums/target-entity.enum";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ReactionType } from "../enum/reaction-type.enum";

@Entity({ name: 'reactions' })
export class Reaction extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: TargetEntity, nullable: false })
  targetType: TargetEntity;

  @Column({ type: 'uuid', nullable: false })
  targetId: string;

  @ManyToOne(() => User, (user) => user.reactions, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'enum', enum: ReactionType, nullable: false })
  type: ReactionType;
}