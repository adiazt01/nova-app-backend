import { BaseEntity } from 'src/common/entities/base.entity';
import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Hashtag } from './hashtag.entity';
import { File } from 'src/files/entities/file.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({
	name: 'posts',
})
export class Post extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		type: 'varchar',
		length: 255,
		nullable: true,
	})
	description: string;

	@Column({
		type: 'varchar',
		length: 255,
		nullable: false,
	})
	title: string;

	@ManyToMany(() => Hashtag, (hashtag) => hashtag.posts)
	@JoinTable()
	hashtags: Hashtag[];

	@ManyToOne(() => User, (user) => user.posts, {
		cascade: true,
	})
	user: User;

	@OneToMany(() => File, (file) => file.post, { cascade: true })
	files: File[];
}
