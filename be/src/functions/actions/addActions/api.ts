import { formatALBResult } from '@common/lib/alUtils';
import { middyfy } from '@common/lib/middy';
import { ALHandler } from '@common/types/AWSHandler';
import { addActionsService } from './service';
import { Action } from './types';

type Body = {
  actions: Action[];
};

const addActionsApi: ALHandler<Body> = async (event, context, cb) => {
  console.log('start addActionApi');
  try {
    const { actions } = event.body;
    console.log(
      '🚀 ~ file: api.ts ~ line 16 ~ constaddActionApi:ALHandler<Body>= ~ event.body',
      event.body
    );
    console.log(
      '🚀 ~ file: api.ts ~ line 16 ~ typeof constaddActionApi:ALHandler<Body>= ~ event.body',
      typeof event.body
    );
    const addActionToTableResult = await Promise.all(
      actions.map((action) => addActionsService(action))
    );
    console.log('end addActionApi');
    return formatALBResult({
      statusCode: 200,
      body: {
        message: 'record created',
      },
    });
  } catch (e) {
    console.error(`error addActionApi: ${e}`);
    return formatALBResult({ statusCode: 400, body: { error: e } });
  }
};

export const main = middyfy(addActionsApi);
