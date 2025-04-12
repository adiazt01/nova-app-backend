import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { EncryptionsService } from 'src/common/services/encryptions/encryptions.service';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly encryptionsService: EncryptionsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, fullName, password, role, username } = createUserDto;
    
    try {
      this.logger.log('Creating user', email);

      const existingUser = await this.findOneByEmail(email);

      if (existingUser) throw new BadRequestException('Email already exists');

      const hashedPassword = await this.encryptionsService.encrypt(password);

      const newUser = this.userRepository.create({
        email,
        fullName,
        password: hashedPassword,
        role,
        username,
      });

      const savedUser = await this.userRepository.save(newUser);
      
      return savedUser;
    } catch (error) {
      this.logger.error(`Error creating user with email ${email}`, error);

      if (error instanceof BadRequestException) {
        throw error;
      }

      this.logger.error('Error creating user', error);
      throw new InternalServerErrorException('An unexpected error occurred while creating the user');
    }
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
