import { ALHandler } from '@common/types/AWSHandler';
import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import cors from '@middy/http-cors';

const middlewares = [middyJsonBodyParser(), httpErrorHandler()];

type Options = {
  cors?: boolean;
};

console.log(cors());

export const middyfy = (
  handler: ALHandler,
  options: Options = { cors: true }
) => {
  const result = middy(handler).use(middlewares);

  if (options?.cors) {
    result.use(cors({ credentials: true, origin: '*' }));
  }

  return result;
};
