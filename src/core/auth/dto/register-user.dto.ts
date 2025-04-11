import { OmitType, PickType,  } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { CreateUserDto } from 'src/core/users/dto/create-user.dto';
import { UserRole } from 'src/core/users/enums/user-role.enum';

export class RegisterUserDto extends OmitType(CreateUserDto, []) {
  
}