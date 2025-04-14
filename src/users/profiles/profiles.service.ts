import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
  private readonly logger = new Logger(ProfilesService.name);
  
  constructor (
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}
  
  findAll() {
    return `This action returns all profiles`;
  }

  async findOne(id: string): Promise<Profile> {
    try {
     const profileFound = await this.profileRepository.findOne({
       where: { id },
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

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    try {
      await this.findOne(id);

      const profileUpdated = await this.profileRepository.save({
        ...updateProfileDto,
        id,
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
}
