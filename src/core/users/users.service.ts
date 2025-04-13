import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { EncryptionsService } from 'src/common/services/encryptions/encryptions.service';
import { ProfilesService } from 'src/profiles/profiles.service';
import { Profile } from 'src/profiles/entities/profile.entity';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly encryptionsService: EncryptionsService,
    private readonly dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, fullName, password, role, bio, username } = createUserDto;

    console.log(createUserDto);

    return await this.dataSource.transaction(async (manager) => {
      try {
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
      } catch (error) {
        this.logger.error(`Error creating user with email ${email}`, error);
        
        throw error instanceof BadRequestException
          ? error
          : new InternalServerErrorException('An unexpected error occurred while creating the user');
      }
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
