import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Hashtag } from './entities/hashtag.entity';
import { PostsProfilesService } from './posts-by-profiles/posts-by-profiles.service';
import { PostsProfilesController } from './posts-by-profiles/posts-by-profiles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Hashtag])],
  controllers: [PostsController, PostsProfilesController],
  providers: [PostsService, PostsProfilesService],
  exports: [],
})
export class PostsModule {}
