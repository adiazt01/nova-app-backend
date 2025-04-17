import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { TargetCommentDto } from './dto/target-comment.dto';

@Injectable()
export class CommentsService {
  private readonly logger = new Logger(CommentsService.name);
  
  constructor (
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  async create(createCommentDto: CreateCommentDto, userId: number) {
    try {
      const comment = this.commentRepository.create({
        content: createCommentDto.content,
        targetId: createCommentDto.targetId,
        targetType: createCommentDto.targetType,
        parent: {
          id: createCommentDto.parentId,
        },
        user: {
          id: userId,
        }
      });
      await this.commentRepository.save(comment);
      this.logger.log('Comment created successfully');
      return comment;
    } catch (error) {
      this.logger.error('Error creating comment', error);

      throw new InternalServerErrorException('Error creating comment');
    }
  }

  async findAllByTarget(targetCommentDto: TargetCommentDto) {
    try {
      const { targetId, targetType } = targetCommentDto;

      const comments = await this.commentRepository.find({
        where: {
          targetId,
          targetType,
        },
        relations: ['user', 'parent', 'replies'],
      });
      
      this.logger.log('Comments retrieved successfully');

      return comments;
    } catch (error) {
      this.logger.error('Error retrieving comments', error);
      throw new InternalServerErrorException('Error retrieving comments');
    }
  }

  async findOne(id: string) {
    try {
      const comment = await this.commentRepository.findOne({
        where: { id },
        relations: ['user', 'parent', 'replies'],
      });

      if (!comment) {
        throw new NotFoundException(`Comment with ID ${id} not found`);
      }

      return comment;
    } catch (error) {
      this.logger.error('Error retrieving comment', error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Error retrieving comment');
    }
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    try {
      const comment = await this.commentRepository.findOne({ where: { id } });

      if (!comment) {
        throw new NotFoundException(`Comment with ID ${id} not found`);
      }

      Object.assign(comment, updateCommentDto);
      await this.commentRepository.save(comment);

      this.logger.log('Comment updated successfully');

      return comment;
    } catch (error) {
      this.logger.error('Error updating comment', error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Error updating comment');
      
    }
  }

  async remove(id: string) {
    try {
      const comment = await this.commentRepository.findOne({ where: { id } });

      if (!comment) {
        throw new NotFoundException(`Comment with ID ${id} not found`);
      }

      await this.commentRepository.remove(comment);

      this.logger.log('Comment deleted successfully');

      return { message: 'Comment deleted successfully' };
    } catch (error) {
      this.logger.error('Error deleting comment', error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Error deleting comment');
    }
  }
}
