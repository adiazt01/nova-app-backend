import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { EncryptionsService } from 'src/common/services/encryptions/encryptions.service';
import { Profile } from 'src/users/profiles/entities/profile.entity';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly encryptionsService: EncryptionsService,
    private readonly dataSource: DataSource,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, fullName, password, role, bio, username } = createUserDto;
    try {
      const newUser = await this.dataSource.transaction(async (manager) => {
        this.logger.log('Creating user', email);

        const existingUser = await manager.findOne(User, { where: { email } });

        if (existingUser) throw new BadRequestException('Email already exists');

        const hashedPassword = await this.encryptionsService.encrypt(password);

        const newUser = manager.create(User, {
          email,
          fullName,
          password: hashedPassword,
          role,
        });

        const savedUser = await manager.save(newUser);

        const newProfile = manager.create(Profile, {
          username,
          bio,
          user: savedUser,
        });

        await manager.save(newProfile);

        return savedUser;
      });

      const user = await this.findOne(newUser.id);

      if (!user) {
        throw new InternalServerErrorException('User creation failed');
      }
      
      return user;
    } catch (error) {
      this.logger.error(`Error creating user with email ${createUserDto.email}`, error);

      throw error instanceof BadRequestException
        ? error
        : new InternalServerErrorException(
          'An unexpected error occurred while creating the user',
        );
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        select: { id: true, email: true, password: true, role: true, profile: { id: true, username: true } },
      });

      if (!user) throw new NotFoundException('User not found');

      return user;
    }
    catch (error) {
      this.logger.error(`Error finding user with id ${id}`, error);

      throw error instanceof BadRequestException
        ? error
        : new InternalServerErrorException(
          'An unexpected error occurred while finding the user',
        );
    }
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
      select: { id: true, email: true, password: true, role: true, profile: { id: true, username: true } },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
