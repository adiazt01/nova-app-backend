import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Auth } from 'src/core/auth/decorators/auth/auth.decorator';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Profiles')
@ApiBearerAuth()
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) { }
  // TODO: Business logic for view
  // @Get()
  // findAll() {
  //   return this.profilesService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.profilesService.findOne(id);
  }

  @Auth()
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

  // @Auth()
  // @Delete(':id')
  // remove(@Param('id', new ParseUUIDPipe()) id: string) {
  //   return this.profilesService.remove(id);
  // }
}
