import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/posts/post.entity';
import { Repository } from 'typeorm';
import { Hashtag } from './entities/hashtag.entity';
import { PaginationOptionsDto } from 'src/common/dto/paginations/pagination-options.dto';
import { PaginationDto } from 'src/common/dto/paginations/pagination.dto';
import { paginate } from 'src/common/helpers/pagination.helper';

@Injectable()
export class PostsService {
  private logger = new Logger(PostsService.name);

  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) { }

  async create(createPostDto: CreatePostDto, userId: number) {
    // const { description, hashtags, title } = createPostDto;

    // try {
    //   const existingHashtags = await this.hashtagRepository.find({
    //     where: hashtags.map((name) => ({ name })),
    //   });

    //   const existingHashtagNames = existingHashtags.map((hashtag) => hashtag.name);
    //   const newHashtagNames = (hashtags ?? []).filter(
    //     (name) => !existingHashtagNames.includes(name),
    //   );

    //   const newHashtags = this.hashtagRepository.create(
    //     newHashtagNames.map((name) => ({ name })),
    //   );

    //   await this.hashtagRepository.save(newHashtags);

    //   const allHashtags = [...existingHashtags, ...newHashtags];

    //   const newPost = this.postsRepository.create({
    //     description,
    //     title,
    //     hashtags: allHashtags,
    //     user: { id: userId }
    //   })

    //   const savedPost = await this.postsRepository.save(newPost);

    //   this.logger.log(`Post created with ID: ${savedPost.id}`)

    //   return savedPost;
    // } catch (error) {
    //   this.logger.error('Error creating a post', error.stack)
    //   throw new InternalServerErrorException(
    //     'An error occurred while creating the post',
    //   );
    // }
  }

  async findAll(paginationOptionsDto: PaginationOptionsDto): Promise<PaginationDto<Post>> {
    try {
      const queryBuilder = this.postsRepository.createQueryBuilder('post');

      queryBuilder.innerJoinAndSelect('post.user', 'user');
      queryBuilder.innerJoinAndSelect('user.profile', 'profile');
      queryBuilder.innerJoinAndSelect('post.hashtags', 'hashtags');

      return await paginate(queryBuilder, paginationOptionsDto);
    } catch (error) {
      this.logger.error(`An error ocurred while fetching posts`, error.stack)

      throw new InternalServerErrorException(
        `An error occurred while fetching posts`,
        error.stack,
      )
    }
  }

  async findOne(id: string): Promise<Post> {
    try {
      const postFound = await this.postsRepository.findOne({
        where: { id },
        relations: {
          user: {
            profile: true,
          },
          hashtags: true,
        },
      });

      if (!postFound) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }

      return postFound;
    } catch (error) {
      this.logger.error(`An error occurred while fetching the post with ID ${id}`, error.stack);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        `An error occurred while fetching the post`,
        error.stack,
      )
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    // try {
    //   const { description, hashtags, title } = updatePostDto;

    //   await this.findOne(id);

    //   const postToUpdate = await this.postsRepository.preload({
    //     id,
    //     description,
    //     title,
    //   });

    //   if (!postToUpdate) {
    //     throw new NotFoundException(`Post with ID ${id} not found`);
    //   }

    //   if (hashtags) {
    //     const existingHashtags = await this.hashtagRepository.find({
    //       where: hashtags.map((name) => ({ name })),
    //     });

    //     const existingHashtagNames = existingHashtags.map((hashtag) => hashtag.name);

    //     const newHashtagNames = hashtags.filter(
    //       (name) => !existingHashtagNames.includes(name),
    //     );
    //     const newHashtags = this.hashtagRepository.create(
    //       newHashtagNames.map((name) => ({ name })),
    //     );
    //     await this.hashtagRepository.save(newHashtags);

    //     const allHashtags = [...existingHashtags, ...newHashtags];
    //     postToUpdate.hashtags = allHashtags;
    //   }

    //   const updatedPost = await this.postsRepository.save(postToUpdate);
    //   this.logger.log(`Post with ID ${id} updated successfully`);
    //   return updatedPost;
    // } catch (error) {
    //   this.logger.error(`An error occurred while updating the post with ID ${id}`, error.stack);

    //   if (error instanceof NotFoundException) {
    //     throw error;
    //   }

    //   throw new InternalServerErrorException(
    //     `An error occurred while updating the post`,
    //     error.stack,
    //   );
    // }
  }

  async remove(id: string) {
    try {
      const postToDelete = await this.postsRepository.findOne({
        where: { id },
      });

      if (!postToDelete) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }

      await this.postsRepository.remove(postToDelete);

      this.logger.log(`Post with ID ${id} deleted successfully`);
      
      return postToDelete;
    } catch (error) {
      this.logger.error(`An error occurred while deleting the post with ID ${id}`, error.stack);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        `An error occurred while deleting the post`,
        error.stack,
      )
    }
  }
}
