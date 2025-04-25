import { Test, TestingModule } from '@nestjs/testing';
import { PostsProfilesService } from './posts-by-profiles.service';

describe('PostsProfilesService', () => {
  let service: PostsProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsProfilesService],
    }).compile();

    service = module.get<PostsProfilesService>(PostsProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
