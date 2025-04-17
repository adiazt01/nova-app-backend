import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { Auth } from 'src/core/auth/decorators/auth/auth.decorator';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { PaginationOptionsDto } from 'src/common/dto/paginations/pagination-options.dto';
import { PaginationDto } from 'src/common/dto/paginations/pagination.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Auth()
  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new post',
    description: 'This endpoint allows you to create a new post.',
  })
  @ApiCreatedResponse({
    description: 'Post created successfully',
    type: CreatePostDto,
  })
  @ApiBody({
    type: CreatePostDto,
    description: 'Post data',
  })
  create(@Body() createPostDto: CreatePostDto, @GetUser('id', new ParseIntPipe()) userId: number) {
    return this.postsService.create(createPostDto, userId);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all posts',
    description: 'This endpoint allows you to retrieve all posts.',
  })
  @ApiOkResponse({
    description: 'Posts retrieved successfully',
    type: PaginationDto,
  })
  findAll(@Query() paginationOptionsDto: PaginationOptionsDto) {
    return this.postsService.findAll(paginationOptionsDto);
  }


  @Get(':id')
  @ApiOperation({
    summary: 'Get post by ID',
    description: 'This endpoint allows you to retrieve a post by its ID.',
  })
  @ApiOkResponse({
    description: 'Post retrieved successfully',
    type: CreatePostDto,
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a post',
    description: 'This endpoint allows you to update a post by its ID.',
  })
  @ApiOkResponse({
    description: 'Post updated successfully',
    type: UpdatePostDto,
  })
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Auth()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a post',
    description: 'This endpoint allows you to delete a post by its ID.',
  })
  @ApiOkResponse({
    description: 'Post deleted successfully',
    type: CreatePostDto,
  })
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.postsService.remove(id);
  }
}
