import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'comments' })
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'uuid', nullable: false })
  targetId: string; // ID de la publicación o historia asociada

  @Column({ type: 'varchar', length: 50, nullable: false })
  targetType: string; // Tipo de publicación (por ejemplo, 'Post', 'Story')

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.replies, { nullable: true, onDelete: 'CASCADE' })
  parent: Comment; // Comentario padre (si es una respuesta)

  @OneToMany(() => Comment, (comment) => comment.parent)
  replies: Comment[]; // Respuestas a este comentario
}