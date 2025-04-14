import {
  Controller,
  Get,
  Body,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Auth } from 'src/core/auth/decorators/auth/auth.decorator';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Auth()
@Controller('profiles')
@ApiTags('Profiles')
@ApiBearerAuth()
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) { }

  @Get('/me')
  @ApiOkResponse({
    description: 'Profile fetched successfully',
  })
  @ApiForbiddenResponse({ 
    description: 'Forbidden',
  })
  findAll() {
    return this.profilesService.findAll();
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
