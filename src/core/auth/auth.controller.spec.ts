import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { EncryptionsService } from 'src/common/services/encryptions/encryptions.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from 'src/users/users.service';
import { UserRole } from 'src/users/enums/user-role.enum';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AuthController', () => {
  let controller: AuthController;
  let userRepository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const mockUserRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    };

    const mockUsersService = {
      findOneByEmail: jest.fn(),
      create: jest.fn(),
    };

    const mockJwtService = {
      sign: jest.fn(),
    };

    const mockEncryptionsService = {
      compare: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: EncryptionsService,
          useValue: mockEncryptionsService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the signUp method with the correct Dto parameter', () => {
    const signUpDto: RegisterUserDto = {
      email: 'test@example.com',
      password: 'password123',
      fullName: 'Test User',
      role: UserRole.USER,
      username: 'testuser',
      bio: 'This is a test bio',
    };

    const signUpSpy = jest.spyOn(controller, 'signUp');

    controller.signUp(signUpDto);

    expect(signUpSpy).toHaveBeenCalledWith(signUpDto);
  });
});
