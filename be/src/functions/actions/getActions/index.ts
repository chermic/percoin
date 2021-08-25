import { handlerPath } from '@common/lib/handlerPath';
import { FunctionDefinition } from '@common/types/common';

export const getActions: FunctionDefinition = {
  handler: `${handlerPath(__dirname)}/api.getActions`,
  events: [
    {
      http: {
        method: 'GET',
        path: 'get-actions',
      },
    },
  ],
};
