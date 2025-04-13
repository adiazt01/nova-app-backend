import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-payload.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { EncryptionsService } from 'src/common/services/encryptions/encryptions.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly encryptionsService: EncryptionsService,
  ) { }

  async signUp(registerUserDto: RegisterUserDto) {
    const { email } = registerUserDto;

    const existingUser = await this.usersService.findOneByEmail(
      email
    );

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const newUser = await this.usersService.create(registerUserDto);

    return {
      ...newUser,
      token: this.generateJwt({
        email: newUser.email,
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
      }),
    };
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

      return {
        ...userFound,
        token: this.generateJwt({
          email: userFound.email,
          id: userFound.id,
          username: userFound.username,
          role: userFound.role,
        }),
      };
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while signing in');
    }
  }

  private generateJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  private handleError(error: any) {
    if (error instanceof BadRequestException) {
      throw new BadRequestException(error.message);
    }

    if (error instanceof UnauthorizedException) {
      throw new UnauthorizedException(error.message);
    }

    throw new BadRequestException('An error occurred');
  }
}
