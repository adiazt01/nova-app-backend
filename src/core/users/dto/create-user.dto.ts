import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { UserRole } from 'src/core/users/enums/user-role.enum';

export class CreateUserDto {
  @ApiProperty({
    default: 'johndoe',
    description: 'The username of the user',
    example: 'johndoe',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    default: 'John Doe',
    description: 'The full name of the user',
    example: 'John Doe',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({
    default: 'user@example.com',
    description: 'The email of the user',
    example: 'user@example.com',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    default: 'StrongPassword123!',
    required: true,
  })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'The role of the user',
    example: UserRole.USER,
    required: true,
    enum: UserRole,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(UserRole)
  role: UserRole = UserRole.USER;
}
