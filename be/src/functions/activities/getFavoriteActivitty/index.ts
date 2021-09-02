import { FunctionDefinition } from '@common/lib/FunctionDefinition';
import { handlerPath } from '@common/lib/handlerPath';
import { IFunctionDefinition } from '@common/types/common';

export const getFavoriteActivity: IFunctionDefinition = new FunctionDefinition({
  handler: `${handlerPath(__dirname)}/api.getFavoriteActivity`,
  events: [
    {
      http: {
        method: 'GET',
        path: 'get-favorite-activity',
      },
    },
  ],
})
  .addCors()
  .getResult();
