import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Register a new user',
    description: 'This endpoint allows a user to register with the system.',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  signUp(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.signUp(registerUserDto);
  }

  // @Post('signin')
  // signIn(@Body() loginUserDto: LoginUserDto) {
  //   return this.authService.signIn(loginUserDto);
  // }

  // @Post('refresh')
  // refresh(@Body() refreshTokenDto: RefreshTokenDto) {
  //   return this.authService.refresh(refreshTokenDto);
  // }

  // @Post('logout')
  // logout(@Body() logoutDto: LogoutDto) {
  //   return this.authService.logout(logoutDto);
  // }

  // @Post('forgot-password')
  // forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
  //   return this.authService.forgotPassword(forgotPasswordDto);
  // }

  // @Post('reset-password')
  // resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
  //   return this.authService.resetPassword(resetPasswordDto);
  // }


  // @Post('verify-email')
  // verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
  //   return this.authService.verifyEmail(verifyEmailDto);
  // }

  // @Post('resend-verification')
  // resendVerification(@Body() resendVerificationDto: ResendVerificationDto) {
  //   return this.authService.resendVerification(resendVerificationDto);
  // }

  // @Post('logout-all')
  // logoutAll(@Body() logoutAllDto: LogoutAllDto) {
  //   return this.authService.logoutAll(logoutAllDto);
  // }

  // @Post('validate-otp')  
  // validateOtp(@Body() validateOtpDto: ValidateOtpDto) {
  //   return this.authService.validateOtp(validateOtpDto);
  // }
}
