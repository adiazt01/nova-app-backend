import { ChildEntity, OneToMany } from "typeorm";
import { Post } from "./post.entity";
import { File } from "src/files/entities/file.entity";
import { PostKind } from "../../enum/post-kind.enum";

@ChildEntity(PostKind.MEDIA)
export class MediaPost extends Post {
	@OneToMany(() => File, (file) => file.post, { cascade: true })
	mediaFiles: File[];
}