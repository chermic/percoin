import { FunctionDefinition } from '@common/lib/FunctionDefinition';
import { handlerPath } from '@common/lib/handlerPath';
import { IFunctionDefinition } from '@common/types/common';
import { addAcitvitySchema } from './schema';

export const addActivity: IFunctionDefinition = new FunctionDefinition({
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
})
  .addCors()
  .getResult();
