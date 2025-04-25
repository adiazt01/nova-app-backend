import { Controller, Get, Param, Query } from '@nestjs/common';
import { PostsProfilesService } from './posts-by-profiles.service';
import { PaginationOptionsDto } from 'src/common/dto/paginations/pagination-options.dto';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts/by-profile/:username')
export class PostsProfilesController {
  constructor(private readonly postsProfilesService: PostsProfilesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get posts by profile username',
    description: 'Retrieve posts associated with a specific profile username.',
  })
  @ApiOkResponse({
    description: 'Posts retrieved successfully',
    type: PaginationOptionsDto,
  })
  findAllByProfileUsername(
    @Param('username') username: string,
    @Query() paginationOptionsDto: PaginationOptionsDto,
  ) {
    return this.postsProfilesService.findAllByProfileUsername(username, paginationOptionsDto);
  }
}
