import { FunctionDefinition } from '@common/lib/FunctionDefinition';
import { handlerPath } from '@common/lib/handlerPath';
import { IFunctionDefinition } from '@common/types/common';

export const dailyPenalty: IFunctionDefinition = new FunctionDefinition({
  handler: `${handlerPath(__dirname)}/api.handler`,
  events: [{ schedule: { rate: 'cron(0 0 * * ? *)', enabled: true } }],
}).getResult();
