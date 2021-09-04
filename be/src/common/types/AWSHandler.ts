import { ALBEvent, ALBResult, Handler } from 'aws-lambda';

type ALEvent<Body, QueryParams> = Omit<
  ALBEvent,
  'body' | 'queryStringParameters'
> & {
  body: Body;
  queryStringParameters?: QueryParams;
};

export type ALHandler<
  EventBody = Record<string, unknown>,
  QueryParams = Record<string, unknown>
> = Handler<ALEvent<EventBody, QueryParams>, ALBResult>;
