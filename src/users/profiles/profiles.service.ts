import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class ProfilesService {
  private readonly logger = new Logger(ProfilesService.name);

  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) { }

  findAll() {
    return `This action returns all profiles`;
  }

  async findOne(id: string): Promise<Profile> {
    try {
      const profileFound = await this.profileRepository.findOne({
        where: {
          id,
        },
        relations: {
          user: true,
        }
      });

      if (!profileFound) {
        throw new NotFoundException('Profile not found');
      }

      return profileFound;
    } catch (error) {
      this.logger.error('Error fetching profile', error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Error fetching profile',
        error,
      );
    }
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    try {
      const profileFound = await this.findOneByUserId(id);

      const profileUpdated = await this.profileRepository.save({
        ...updateProfileDto,
        id: profileFound.id,
      });

      this.logger.log(`Profile updated successfully: ${profileUpdated.id}`);

      return profileUpdated;
    } catch (error) {
      this.logger.error('Error updating profile', error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Error updating profile',
        error,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }

  async findOneByTerm(term: string): Promise<Profile> {
    try {
      const profileFound = await this.profileRepository.findOne({
        where: {
          id: isUUID(term) ? term : undefined,
          username: !isUUID(term) ? term : undefined,
        },
        relations: {
          user: true,
        }
      });
      if (!profileFound) {
        throw new NotFoundException('Profile not found');
      }
      return profileFound;
    } catch (error) {
      this.logger.error('Error fetching profile by term', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error fetching profile by term',
        error,
      );
    }
  }

  private async findOneByUserId(userId: number): Promise<Profile> {
    try {
      const profileFound = await this.profileRepository.findOne({
        where: {
          user: {
            id: userId,
          },
        },
      });

      if (!profileFound) {
        throw new NotFoundException('Profile not found');
      }

      return profileFound
    } catch (error) {
      this.logger.error('Error fetching profile by user ID', error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Error fetching profile by user ID',
        error,
      );
    }
  }
}
