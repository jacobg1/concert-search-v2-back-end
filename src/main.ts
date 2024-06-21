import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APIGatewayProxyEventV2, Handler } from 'aws-lambda';
import { ConcertService } from './services/concert.service';
import { handleResponse, handleError } from './helpers';
import { HttpRoutes } from './interface/concerts.enum';
import { extractReqData } from './helpers/request';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'log', 'warn'],
  });

  return app;
}

const routeConfig = {
  [HttpRoutes.LIST_CONCERTS]: 'getConcertList',
  [HttpRoutes.GET_CONCERT_BY_ID]: 'getSingleConcert',
};

export const handler: Handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const { routeKey } = event;

    if (!routeKey) {
      throw new Error('Invalid request');
    }

    const routeHandler = routeConfig[routeKey];

    if (!routeHandler) {
      throw Error('Not found');
    }

    const appContext = await bootstrap();
    const appService = appContext.get(ConcertService);

    const requestData = extractReqData(event);
    const response = await appService[routeHandler](requestData);

    return handleResponse(response);
  } catch (error) {
    Logger.error(error);
    return handleError(error);
  }
};
