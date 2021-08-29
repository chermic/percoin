import { FunctionDefinition } from '@common/lib/FunctionDefinition';
import { handlerPath } from '@common/lib/handlerPath';
import { IFunctionDefinition } from '@common/types/common';

export const getActions: IFunctionDefinition = new FunctionDefinition({
  handler: `${handlerPath(__dirname)}/api.getActions`,
  events: [
    {
      http: {
        method: 'GET',
        path: 'get-actions',
      },
    },
  ],
})
  .addCors()
  .getResult();
