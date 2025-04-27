import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { EncryptionsService } from 'src/common/services/encryptions/encryptions.service';
import { OtpController } from './otp/otp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './otp/entities/otp.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { RouterModule } from '@nestjs/core';
import { RefreshToken } from './entities/refresh-token.entity';
import { TokensModule } from './tokens/tokens.module';
import { ValidationModule } from './validation/validation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Otp, RefreshToken]),
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
    RouterModule.register([
      {
        path: 'auth',
        module: AuthModule,
        children: [
          {
            path: 'otp',
            module: OtpController,
          },
          {
            path: 'tokens',
            module: TokensModule,
          },
          {
            path: 'validation',
            module: ValidationModule,
          },
        ],
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    UsersService,
    EncryptionsService,
  ],
  exports: [],
})
export class AuthModule { }
