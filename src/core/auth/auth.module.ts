import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersService } from '../users/users.service';;
import { UsersModule } from '../users/users.module';
import { EncryptionsService } from 'src/common/services/encryptions/encryptions.service';
import { OtpService } from './otp/otp.service';
import { OtpController } from './otp/otp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './otp/entities/otp.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Otp,
    ]),
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
        },
      }),
    }),
  ],
  controllers: [AuthController, OtpController],
  providers: [AuthService, JwtStrategy, UsersService, EncryptionsService, OtpService],
})
export class AuthModule { }
