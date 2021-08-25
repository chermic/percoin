import { handlerPath } from '@common/lib/handlerPath';
import { FunctionDefinition } from '@common/types/common';
import { addAcitvitySchema } from './schema';

export const addActivity: FunctionDefinition = {
  handler: `${handlerPath(__dirname)}/api.addActivity`,
  events: [
    {
      http: {
        method: 'POST',
        path: 'add-activity',
        request: {
          schema: { 'application/json': addAcitvitySchema as any },
        },
      },
    },
  ],
};
