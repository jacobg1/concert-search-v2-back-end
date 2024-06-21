import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus } from '@nestjs/common';
import { Handler } from 'aws-lambda';
import { ConcertService } from './services/concert.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'log', 'warn'],
  });

  return app;
}

export const handler: Handler = async () => {
  try {
    const appContext = await bootstrap();
    const appService = appContext.get(ConcertService);

    return {
      body: JSON.stringify(await appService.getHello()),
      statusCode: HttpStatus.OK,
    };
  } catch (error) {
    Logger.error(error);

    const errorMessage = error.message || 'Internal Server Error';

    return {
      statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      isBase64Encoded: false,
      headers: {
        'Content-Type': 'application/json',
        'x-amzn-ErrorType': 'Error',
      },
      body: JSON.stringify({ message: errorMessage }),
    };
  }
};
