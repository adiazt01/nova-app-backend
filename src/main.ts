import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swagger = new DocumentBuilder()
    .setTitle('Nova API')
    .setDescription('Nova API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('nova')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('api', app, documentFactory);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
