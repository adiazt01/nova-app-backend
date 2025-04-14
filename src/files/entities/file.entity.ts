import { BaseEntity } from 'src/common/entities/base.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Story } from 'src/stories/entities/story.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'files',
})
export class File extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  originalName: string;

  @Column({ type: 'varchar', length: 255 })
  path: string;

  @Column({ type: 'varchar', length: 255 })
  filename: string;

  @Column({ type: 'varchar', length: 255 })
  mimetype: string;

  @Column({ type: 'int' })
  size: number;

  // Relations
  @OneToOne(() => Story, (story) => story.file)
  story?: Story;

  @ManyToOne(() => Post, (post) => post.files, { onDelete: 'CASCADE' })
  post?: Post;
}
