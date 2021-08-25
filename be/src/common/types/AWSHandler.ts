import { ALBEvent, ALBResult, Handler } from 'aws-lambda';

type ALEvent<Body> = Omit<ALBEvent, 'body'> & {
  body: Body;
};

export type ALHandler<EventBody = Record<string, unknown>> = Handler<
  ALEvent<EventBody>,
  ALBResult
>;
