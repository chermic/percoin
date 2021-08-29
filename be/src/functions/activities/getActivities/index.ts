import { FunctionDefinition } from '@common/lib/FunctionDefinition';
import { handlerPath } from '@common/lib/handlerPath';
import { IFunctionDefinition } from '@common/types/common';

export const getActivities: IFunctionDefinition = new FunctionDefinition({
  handler: `${handlerPath(__dirname)}/api.getActivities`,
  events: [
    {
      http: {
        cors: true,
        method: 'GET',
        path: 'get-activities',
        request: {
          parameters: {
            querystrings: {
              startDate: { required: false },
              endDate: { required: false },
              user: { required: false },
            },
          },
        },
      },
    },
  ],
})
  .addCors()
  .getResult();
