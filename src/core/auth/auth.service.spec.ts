import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserRole } from '../users/enums/user-role.enum';
import { JwtService } from '@nestjs/jwt';
import { EncryptionsService } from 'src/common/services/encryptions/encryptions.service';
import { User } from '../users/entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  let encryptionsService: EncryptionsService;

  beforeEach(async () => {
    const mockUsersService = {
      create: jest.fn(),
      findOneByEmail: jest.fn(),
    }

    const mockJwtService = {
      sign: jest.fn(),
    }

    const mockEncryptionsService = {
      compare: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
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
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    encryptionsService = module.get<EncryptionsService>(EncryptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a JWT token with the correct payload', async () => {
    const dto: RegisterUserDto = {
      email: 'test@example.com',
      password: 'password123',
      fullName: 'Test User',
      username: 'testuser',
      role: UserRole.USER,
    };
  
    const createdUser: User = {
      id: 1,
      ...dto,
      password: 'hashed-password-placeholder',
      createdAt: new Date(),
      updatedAt: new Date(),
      otps: [],
    };
  
    jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(null);
    jest.spyOn(usersService, 'create').mockResolvedValue(createdUser);
    jest.spyOn(jwtService, 'sign').mockReturnValue('mocked-jwt-token');
  
    const result = await service.signUp(dto);
  
    expect(usersService.findOneByEmail).toHaveBeenCalledWith(dto.email);
    expect(usersService.create).toHaveBeenCalledWith(dto);
    expect(jwtService.sign).toHaveBeenCalledWith({
      id: createdUser.id,
      email: createdUser.email,
      username: createdUser.username,
      role: createdUser.role,
    });
  
    expect(result).toEqual({
      ...createdUser,
      token: 'mocked-jwt-token',
    });
  });

  it('should generate a JWT token with the correct payload for signIn', async () => {
    const dto: RegisterUserDto = {
      email: 'test@example.com',
      password: 'password123',
      fullName: 'Test User',
      username: 'testuser',
      role: UserRole.USER,
    };

    const userFound: User = {
      id: 1,
      ...dto,
      password: 'hashed-password-placeholder',
      createdAt: new Date(),
      updatedAt: new Date(),
      otps: [],
    }

    jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(userFound);
    jest.spyOn(encryptionsService, 'compare').mockResolvedValue(true);
    jest.spyOn(jwtService, 'sign').mockReturnValue('mocked-jwt-token');

    const result = await service.signIn(dto);

    expect(usersService.findOneByEmail).toHaveBeenCalledWith(dto.email);
    expect(encryptionsService.compare).toHaveBeenCalledWith(dto.password, userFound.password);
    expect(jwtService.sign).toHaveBeenCalledWith({
      id: userFound.id,
      email: userFound.email,
      username: userFound.username,
      role: userFound.role,
    });

    expect(result).toEqual({
      ...userFound,
      token: 'mocked-jwt-token',
    });
  })
});
