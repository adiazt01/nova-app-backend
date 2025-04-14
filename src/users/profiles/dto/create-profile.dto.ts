import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @ApiPropertyOptional({
    description: 'The bio of the user',
    default: 'This is my bio',
    required: false,
  })
  @IsOptional()
  @IsString()
  bio: string;

  @ApiProperty({
    description: 'The username of the user ',
    default: 'johndoe',
    required: true,
  })
  @IsString()
  username: string;
}
