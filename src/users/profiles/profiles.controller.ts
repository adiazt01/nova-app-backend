import {
  Controller,
  Get,
  Body,
  Patch,
  ParseIntPipe,
  Param,
  ForbiddenException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CONTROLLER_NAMES } from 'src/config/constants/controller.constant';
import { Auth } from 'src/core/auth/decorators/auth/auth.decorator';

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
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiParam({
    name: 'term',
    description: 'Username or id',  
  })
  findOneByTerm(@Param('term') term: string) {
    return this.profilesService.findOneByTerm(term);
  }

  @Auth()
  @ApiBearerAuth()
  @Patch()
  @ApiOkResponse({
    description: 'Profile updated successfully',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  update(
    @Body() updateProfileDto: UpdateProfileDto,
    @GetUser('id', new ParseIntPipe()) userId: number,
  ) 
  {
    return this.profilesService.update(userId, updateProfileDto);
  }
}
