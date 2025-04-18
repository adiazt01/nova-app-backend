import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Auth } from 'src/core/auth/decorators/auth/auth.decorator';
import { TargetCommentDto } from './dto/target-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @Auth()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new comment',
    description: 'Creates a new comment in the system.',
  })
  create(@Body() createCommentDto: CreateCommentDto, @GetUser('id') userId: number) {
    return this.commentsService.create(createCommentDto, userId);
  }

  @Get()
  @ApiOperation({
    summary: 'Get comments by target',
    description: 'Retrieves comments based on the target ID and type.',
  })
  findAllByTarget(
    @Query() targetCommentDto: TargetCommentDto
  ) {
    return this.commentsService.findAllByTarget(targetCommentDto);
  }

  @ApiOperation({
    summary: 'Get a comment by ID',
    description: 'Retrieves a specific comment by its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the comment',
    type: 'string',
    format: 'uuid',
    required: true,
  })
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.commentsService.findOne(id);
  }

  @Auth()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a comment by ID',
    description: 'Updates a specific comment by its ID.',
  })
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Auth()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a comment by ID',
    description: 'Deletes a specific comment by its ID.',
  })
  @Delete(':id')
  remove(@Param('id',  new ParseUUIDPipe()) id: string) {
    return this.commentsService.remove(id);
  }
}
