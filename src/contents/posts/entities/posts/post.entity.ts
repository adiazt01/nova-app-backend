import { BaseEntity } from 'src/common/entities/base.entity';
import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	TableInheritance,
} from 'typeorm';
import { Hashtag } from '../hashtag.entity';
import { User } from 'src/users/entities/user.entity';
import { PostKind } from '../../enum/post-kind.enum';

@Entity({
	name: 'posts',
})
@TableInheritance({
	column: {
		type: 'enum',
		enum: PostKind,
	},
})
export class Post extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToMany(() => Hashtag, (hashtag) => hashtag.posts)
	@JoinTable()
	hashtags: Hashtag[];

	@ManyToOne(() => User, (user) => user.posts, {
		cascade: true,
	})
	user: User;
}
