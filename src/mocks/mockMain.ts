import { handler as mainHandler } from '../main';
import type {
  APIGatewayProxyEventV2,
  Callback,
  Context,
  Handler,
} from 'aws-lambda';
import { server } from './node';

server.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url);
});

export const handler: Handler = (
  event: APIGatewayProxyEventV2,
  context: Context,
  callback: Callback<any>,
) => {
  server.listen();
  return mainHandler(event, context, callback);
};
