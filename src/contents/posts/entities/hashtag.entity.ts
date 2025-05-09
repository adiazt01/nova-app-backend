import { BaseEntity } from 'src/common/entities/base.entity';
import { BeforeInsert, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './posts/post.entity';

@Entity({
  name: 'hashtags',
})
export class Hashtag extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  name: string;

  @ManyToMany(() => Post, (post) => post.hashtags)
  posts: Post[];

  @BeforeInsert()
  async normalizeName() {
    this.name = this.name.toLowerCase().trim().replace(/^#/, '');
  }
}
