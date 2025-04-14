import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Auth } from 'src/core/auth/decorators/auth/auth.decorator';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}
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
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(id, updateProfileDto);
  }

  // @Auth()
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.profilesService.remove(+id);
  // }
}
