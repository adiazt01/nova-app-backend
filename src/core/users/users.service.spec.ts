import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './enums/user-role.enum';
import { EncryptionsService } from 'src/common/services/encryptions/encryptions.service';
import { BadRequestException, Logger } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let encryptionService: EncryptionsService;

  beforeEach(async () => {
    // Unhabilitate the logger
    jest.spyOn(Logger.prototype, 'error').mockImplementation(() => {});
    jest.spyOn(Logger.prototype, 'log').mockImplementation(() => {});

    const mockUserRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      save: jest.fn(),
    };

    const mockEncryptionService = {
      encrypt: jest.fn(),
      compare: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: getRepositoryToken(User),
        useValue: mockUserRepository,
      },
      {
        provide: EncryptionsService,
        useValue: mockEncryptionService,
      },
        UsersService,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    encryptionService = module.get<EncryptionsService>(EncryptionsService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const newUser: CreateUserDto = {
      email: 'test@example.com',
      password: 'password123',
      fullName: 'Test User',
      username: 'testuser',
      role: UserRole.USER,
    };

    const createdUser: User = {
      ...newUser,
      password: 'mockedEncryptedPassword',
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(userRepository, 'create').mockReturnValue(createdUser);
    jest.spyOn(userRepository, 'save').mockResolvedValue(createdUser);
    jest.spyOn(encryptionService, 'encrypt').mockResolvedValue('mockedEncryptedPassword');

    const result = await service.create(newUser);

    expect(encryptionService.encrypt).toHaveBeenCalledWith(newUser.password);

    expect(userRepository.create).toHaveBeenCalledWith(expect.objectContaining({
      ...newUser,
      password: 'mockedEncryptedPassword',
    }));

    expect(userRepository.save).toHaveBeenCalledWith(expect.objectContaining({
      ...newUser,
      password: 'mockedEncryptedPassword',
    }));

    expect(result).toEqual({
      ...newUser,
      password: 'mockedEncryptedPassword',
      id: 1,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it("don't allow create a user with an existing email", async () => {
    const existingUser: User = {
      id: 1,
      email: 'test@example.com',
      password: 'password123',
      fullName: 'Test User',
      username: 'testuser',
      role: UserRole.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newUser: CreateUserDto = {
      email: 'test@example.com',
      password: 'password123',
      fullName: 'Test User',
      username: 'testuser',
      role: UserRole.USER,
    };

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(existingUser);

    
    await expect(service.create(newUser)).rejects.toThrow(BadRequestException);
    await expect(service.create(newUser)).rejects.toThrow('Email already exists');

    expect(userRepository.create).not.toHaveBeenCalled();
    expect(userRepository.save).not.toHaveBeenCalled();
  });

  it('should find a user by email', async () => {
    const existingUser: User = {
      id: 1,
      email: 'test@example.com',
      password: 'mockedEncryptedPassword',
      fullName: 'Test User',
      username: 'testuser',
      role: UserRole.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(existingUser);

    const result = await service.findOneByEmail('test@example.com');

    expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    expect(result).toEqual(existingUser);
  });
});
