import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-payload.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { EncryptionsService } from 'src/common/services/encryptions/encryptions.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly encryptionsService: EncryptionsService,
  ) {}

  async signUp(registerUserDto: RegisterUserDto) {
    try {
      const newUser = await this.usersService.create(registerUserDto);

      this.logger.log(`User created successfully: ${newUser}`);

      return {
        ...newUser,
        token: this.generateJwt({
          email: newUser.email,
          id: newUser.id,
          role: newUser.role,
        }),
      };
    } catch (error) {
      this.logger.error('Error during sign-up', error.stack);
      this.handleError(error);
    }
  }

  async signIn(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    try {
      const userFound = await this.usersService.findOneByEmail(email);

      if (!userFound) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await this.encryptionsService.compare(
        password,
        userFound.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      this.logger.log(`User signed in successfully: ${userFound.email}`);

      return {
        ...userFound,
        token: this.generateJwt({
          email: userFound.email,
          id: userFound.id,
          role: userFound.role,
        }),
      };
    } catch (error) {
      this.logger.error('Error during sign-in', error.stack);
      this.handleError(error);
    }
  }

  private generateJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  private handleError(error: any) {
    if (
      error instanceof BadRequestException ||
      error instanceof UnauthorizedException
    ) {
      throw error;
    }

    throw new InternalServerErrorException('An unexpected error occurred');
  }
}
