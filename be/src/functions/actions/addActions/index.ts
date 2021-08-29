import { FunctionDefinition } from '@common/lib/FunctionDefinition';
import { handlerPath } from '@common/lib/handlerPath';
import { addActionSchema } from './schema';

const handler = `${handlerPath(__dirname)}/api.main`;
export const addActions = new FunctionDefinition({
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
})
  .addCors()
  .getResult();
