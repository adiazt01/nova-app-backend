import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserRole } from '../users/enums/user-role.enum';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const mockUsersService = {
      create: jest.fn(),
      findOneByEmail: jest.fn(),
    }

    const mockJwtService = {
      sign: jest.fn(),
    }

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
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
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
  
    const createdUser = {
      id: 1,
      ...dto,
      password: 'hashed-password-placeholder',
      createdAt: new Date(),
      updatedAt: new Date(),
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
});
