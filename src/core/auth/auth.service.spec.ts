import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserRole } from '../users/enums/user-role.enum';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;
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
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a new user with a token when signUp is called', async () => {
    const dto: RegisterUserDto = {
      email: 'test@example.com',
      password: 'password123',
      fullName: 'Test User',
      username: 'testuser',
      role: UserRole.USER
    };

    const createdUser = {
      ...dto,
      id: 1,
    }

    jest.spyOn(service, 'signUp').mockResolvedValue(createdUser);

    const result = await service.signUp(dto);

    expect(userService.findOneByEmail).toHaveBeenCalledWith(dto.email);
    expect(userService.create).toHaveBeenCalledWith(dto);
    expect(jwtService.sign).toHaveBeenCalledWith({ id: createdUser.id, email: createdUser.email, username: createdUser.username, role: createdUser.role });
    expect(result).toEqual({
      ...createdUser,
      token: expect.any(String),
    });
  })
});
