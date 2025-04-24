import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';
import { ApiBearerAuth, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { Auth } from 'src/core/auth/decorators/auth/auth.decorator';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Reaction } from './entities/reaction.entity';
import { TargetReactionDto } from './dto/target-reaction.dto';

@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) { }

  @Auth()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new reaction',
    description: 'Creates a new reaction in the system.',
  })
  @Post()
  create(@Body() createReactionDto: CreateReactionDto, @GetUser('id') userId: number) {
    return this.reactionsService.create(createReactionDto, userId);
  }

  @Get()
  @ApiOperation({
    summary: 'Get reactions by target',
    description: 'Retrieves reactions based on the target ID and type.',
  })
  findAllByTarget(
    @Query() targetReactionDto: TargetReactionDto,
  ): Promise<Reaction[]> {
    return this.reactionsService.findAllByTarget(targetReactionDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a reaction by ID',
    description: 'Retrieves a specific reaction by its ID.',
  })
  findOne(@Param('id') id: string) {
    return this.reactionsService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a reaction by ID',
    description: 'Updates a specific reaction by its ID.',
  })
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateReactionDto: UpdateReactionDto) {
    return this.reactionsService.update(id, updateReactionDto);
  }

  @Delete(':id')
  @Auth()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a reaction by ID', 
    description: 'Deletes a specific reaction by its ID.',
  })
  remove(@Param('id') id: string) {
    return this.reactionsService.remove(id);
  }
}
