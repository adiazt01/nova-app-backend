import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reaction } from './entities/reaction.entity';
import { Repository } from 'typeorm';
import { TargetReactionDto } from './dto/target-reaction.dto';

@Injectable()
export class ReactionsService {
  private readonly logger = new Logger(ReactionsService.name);

  constructor(
    @InjectRepository(Reaction)
    private readonly reactionRepository: Repository<Reaction>,
  ){}
  
  async create(createReactionDto: CreateReactionDto, userId: number): Promise<Reaction> {
    try {
      const { targetId, type, targetType } = createReactionDto;

      this.logger.log(`Creating reaction for targetId: ${targetId}, type: ${type}, targetType: ${targetType}, userId: ${userId}`);

      const newReaction = this.reactionRepository.create({
        targetId,
        type,
        targetType,
        user: {
          id: userId,
        }
      })

      const savedReaction = await this.reactionRepository.save(newReaction);

      return savedReaction;
    } catch (error) {      
      this.logger.error('Error creating reaction', error);

      throw new InternalServerErrorException('Error creating reaction');
    }
  }

  async findAllByTarget(targetCommentDto: TargetReactionDto): Promise<Reaction[]> {
    try {
      const { targetId, targetType } = targetCommentDto;

      const reactions = await this.reactionRepository.find({
        where: {
          targetId,
          targetType,
        },
        relations: ['user'],
      });

      this.logger.log('Reactions retrieved successfully');

      return reactions;
    } catch (error) {
      this.logger.error('Error retrieving reactions', error);
      throw new InternalServerErrorException('Error retrieving reactions');
    }
  }

  findAll() {
    return `This action returns all reactions`;
  }

  findOne(id: string) {
    return this.reactionRepository.findOne({ where: { id } });
  }

  async update(id: string, updateReactionDto: UpdateReactionDto) {
    try {
      const reaction = await this.reactionRepository.preload({
        id,
        ...updateReactionDto,
      });

      if (!reaction) {
        throw new NotFoundException('Reaction not found');
      }

      const updatedReaction = await this.reactionRepository.save(reaction);

      this.logger.log(`Reaction with ID ${id} updated successfully`);

      return updatedReaction;
    } catch (error) {
      this.logger.error('Error updating reaction', error);
      throw new InternalServerErrorException('Error updating reaction');
    }
  }

  remove(id: string) {
    return `This action removes a #${id} reaction`;
  }
}
