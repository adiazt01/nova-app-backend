import { ChildEntity, Column } from "typeorm";
import { Post } from "./post.entity";
import { PostKind } from "../../enum/post-kind.enum";

@ChildEntity(PostKind.TEXT)
export class TextPost extends Post {
    @Column({
        type: 'text',
        nullable: false,
    })
    content: string;

    // COLOR BACKGROUND
    // COLOR TEXT
    // FONT SIZE

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    backgroundColor: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    textColor: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    fontFamily: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    fontSize: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    fontWeight: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    fontStyle: string;
}