import { FunctionDefinition } from '@common/lib/FunctionDefinition';
import { handlerPath } from '@common/lib/handlerPath';
import { IFunctionDefinition } from '@common/types/common';

export const getActivityStatistic: IFunctionDefinition = new FunctionDefinition(
  {
    handler: `${handlerPath(__dirname)}/api.getActivityStatistic`,
    events: [
      {
        http: {
          method: 'GET',
          path: 'get-activity-statistic',
        },
      },
    ],
  }
)
  .addCors()
  .getResult();
