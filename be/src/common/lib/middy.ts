import { ALHandler } from '@common/types/AWSHandler';
import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';

const middlewares = [middyJsonBodyParser(), httpErrorHandler()];

export const middyfy = (handler: ALHandler) => {
  return middy(handler).use(middlewares);
};
