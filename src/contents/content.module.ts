import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { StoriesModule } from './stories/stories.module';
import { CommentsModule } from './comments/comments.module';
import { ReactionsModule } from './reactions/reactions.module';

@Module({
    imports: [PostsModule, StoriesModule, CommentsModule, ReactionsModule]
})
export class ContentModule {}
