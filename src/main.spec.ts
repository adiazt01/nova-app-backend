import { NestFactory } from "@nestjs/core";
import { bootstrap } from "./main";
import { ValidationPipe } from "@nestjs/common";

jest.mock('@nestjs/core', () => {
  return {
    NestFactory: {
      create: jest.fn().mockResolvedValue({
        listen: jest.fn(),
        setGlobalPrefix: jest.fn(),
        useGlobalPipes: jest.fn(),
        getHttpAdapter: jest.fn()
      }),
    }
  };
});

describe('Main bootstrap (root)', () => {
  it('should create the app and listen on the correct port', async () => {
    const mockApp = {
      listen: jest.fn(),
      setGlobalPrefix: jest.fn(),
      useGlobalPipes: jest.fn(),
    };

    (NestFactory.create as jest.Mock).mockResolvedValue(mockApp);


    await bootstrap();

    expect(NestFactory.create).toHaveBeenCalledTimes(2);
    expect(mockApp.setGlobalPrefix).toHaveBeenCalledWith('api');
    expect(mockApp.useGlobalPipes).toHaveBeenCalledWith(
      expect.any(ValidationPipe),
    );
    expect(mockApp.listen).toHaveBeenCalledWith(process.env.PORT ?? 3000);
    expect(mockApp.listen).toHaveBeenCalledTimes(1);
  });
});