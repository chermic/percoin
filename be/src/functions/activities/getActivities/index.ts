import { handlerPath } from '@common/lib/handlerPath';
import { FunctionDefinition } from '@common/types/common';

export const getActivities: FunctionDefinition = {
  handler: `${handlerPath(__dirname)}/api.getActivities`,
  events: [
    {
      http: {
        method: 'GET',
        path: 'get-activities',
        request: {
          parameters: {
            querystrings: {
              startDate: {},
              endDate: {},
              user: {},
            },
          },
        },
      },
    },
  ],
};
