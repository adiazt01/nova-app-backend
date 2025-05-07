import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/posts/post.entity';
import { PostsProfilesService } from './posts-by-profiles/posts-by-profiles.service';
import { PostsProfilesController } from './posts-by-profiles/posts-by-profiles.controller';
import { TextPost } from './entities/posts/post-text.entity';
import { MediaPost } from './entities/posts/post-media.entity';
import { Hashtag } from './entities/hashtag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, TextPost, MediaPost, Hashtag])],
  controllers: [PostsController, PostsProfilesController],
  providers: [PostsService, PostsProfilesService],
  exports: [],
})
export class PostsModule {}
