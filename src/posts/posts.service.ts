import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { Hashtag } from './entities/hashtag.entity';

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
    const { description, hashtags, title } = createPostDto;

    try {
      const existingHashtags = await this.hashtagRepository.find({
        where: hashtags.map((name) => ({ name })),
      });

      const existingHashtagNames = existingHashtags.map((hashtag) => hashtag.name);
      const newHashtagNames = hashtags.filter(
        (name) => !existingHashtagNames.includes(name),
      );

      const newHashtags = this.hashtagRepository.create(
        newHashtagNames.map((name) => ({ name })),
      );      

      await this.hashtagRepository.save(newHashtags);

      const allHashtags = [...existingHashtags, ...newHashtags];

      const newPost = this.postsRepository.create({
        description,
        title,
        hashtags: allHashtags,
        user: { id: userId }
      })

      const savedPost = await this.postsRepository.save(newPost);

      this.logger.log(`Post created with ID: ${savedPost.id}`)

      return savedPost;
    } catch (error) {
      this.logger.error('Error creating a post', error.stack)
      throw new InternalServerErrorException(
        'An error occurred while creating the post',
      );
    }
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
