import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hashtag } from "./hashtag.entity";
import { User } from "src/core/users/entities/user.entity";

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

    @ManyToMany(() => Hashtag, (hashtag) => hashtag.posts)
    hashtags: Hashtag[];

    @ManyToOne(() => User, (user) => user.posts, {
        cascade: true,
    })
    user: User;
}
