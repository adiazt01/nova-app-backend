import { Test, TestingModule } from '@nestjs/testing';
import { PostsProfilesController } from './posts-by-profiles.controller';

describe('PostsProfilesController', () => {
  let controller: PostsProfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsProfilesController],
    }).compile();

    controller = module.get<PostsProfilesController>(PostsProfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
