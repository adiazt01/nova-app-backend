import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createUserDto: RegisterUserDto) {
    // return this.authService.signUp(createUserDto);
  }

  // @Post('signin')
  // signIn(@Body() loginUserDto: LoginUserDto) {
  //   return this.authService.signIn(loginUserDto);
  // }
}
