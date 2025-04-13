import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { EncryptionsService } from 'src/common/services/encryptions/encryptions.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserRole } from '../users/enums/user-role.enum';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const mockUsersService = {
      findOneByEmail: jest.fn(),
      create: jest.fn(),
    }

    const mockJwtService = {
      sign: jest.fn(),
    }

    const mockEncryptionsService = {
      compare: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
      ],
      controllers: [AuthController],
      providers: [AuthService, {
        provide: UsersService,
        useValue: mockUsersService,
      }, {
          provide: JwtService,
          useValue: mockJwtService,
        }, {
          provide: EncryptionsService,
          useValue: mockEncryptionsService,
        }],
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
    } 
    
    const signUpSpy = jest.spyOn(controller, 'signUp');

    controller.signUp(signUpDto);

    expect(signUpSpy).toHaveBeenCalledWith(signUpDto);
  });
  
});
