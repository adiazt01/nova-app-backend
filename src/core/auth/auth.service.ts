import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor (
    private readonly usersService: UsersService,
  ) {}

  // async signUp(registerUserDto: RegisterUserDto) {
  //   const { email } = registerUserDto;
    
  //   const existingUser = await this.usersService.findOneByEmail(
  //     email
  //   );

  //   if (existingUser) {
  //     throw new BadRequestException('User with this email already exists');
  //   }

  //   const newUser = await this.usersService.create(registerUserDto);

  //   return {
  //     ...newUser,
  //     token: this.getJwtToken({
  //       email: newUser.email,
  //       id: newUser.id,
  //       username: newUser.username,
  //     }),
  //   };
  
}
