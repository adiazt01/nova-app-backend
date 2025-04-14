import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { EncryptionsService } from 'src/common/services/encryptions/encryptions.service';

describe('UsersController', () => {
  let controller: UsersController;
  let encryptionsService: EncryptionsService;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService,
        {
          provide: EncryptionsService,
          useValue: {},
        },  
        {
          provide: DataSource,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    encryptionsService = module.get<EncryptionsService>(EncryptionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
