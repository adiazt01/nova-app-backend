import { Global, Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import schemas from './config/schemas';
import configurations from './config/configurations';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { ProfilesModule } from './users/profiles/profiles.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FeedsModule } from './feeds/feeds.module';
import { FilesModule } from './files/files.module';
import { ContentModule } from './content/content.module';

@Global()
@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: schemas(),
      load: [...configurations()],
      validationOptions: {
        allowUnknown: false,
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        port: configService.get('DB_PORT'),
        host: configService.get('DB_HOST'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: true,
        autoLoadEntities: true,
        type: 'postgres',
      }),
    }),
    CoreModule,
    CommonModule,
    ProfilesModule,
    FeedsModule,
    FilesModule,
    ContentModule,
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class AppModule {}
