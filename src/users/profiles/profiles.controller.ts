import {
  Controller,
  Get,
  Body,
  Patch,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CONTROLLER_NAMES } from 'src/config/constants/controller.constant';

@Controller(CONTROLLER_NAMES.PROFILES)
@ApiTags(CONTROLLER_NAMES.PROFILES)
@ApiBearerAuth()
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) { }

  @Get(':term') 
  @ApiOperation({
    summary: 'Get profile by term',
    description: 'Get profile by username or id',
  })
  @ApiOkResponse({
    description: 'Profile fetched successfully',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden', 
  })
  findOneByTerm(@Param('term') term: string) {
    return this.profilesService.findOneByTerm(term);
  }

  @Patch('/me')
  @ApiOkResponse({
    description: 'Profile updated successfully',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  update(@Body() updateProfileDto: UpdateProfileDto, @GetUser('id', new ParseIntPipe()) userId: number) {
    return this.profilesService.update(userId, updateProfileDto);
  }
}
