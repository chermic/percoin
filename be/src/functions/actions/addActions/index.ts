import { handlerPath } from '@common/lib/handlerPath';
import { FunctionDefinition } from '@common/types/common';
import { addActionSchema } from './schema';

const handler = `${handlerPath(__dirname)}/api.main`;
export const addActions: FunctionDefinition = {
  handler,
  events: [
    {
      http: {
        method: 'POST',
        path: 'add-actions',
        request: {
          schema: {
            'application/json': addActionSchema as any,
          },
        },
      },
    },
  ],
};
