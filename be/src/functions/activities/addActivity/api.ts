import { formatALBResult } from '@common/lib/alUtils';
import { middyfy } from '@common/lib/middy';
import { ALHandler } from '@common/types/AWSHandler';
import { Activity } from '../types';
import { addActivityService } from './service';

const addActivityApi: ALHandler<Activity> = async (event) => {
  try {
    const { action, date, user } = event.body;
    if (!(action && date && user)) {
      return formatALBResult({
        statusCode: 400,
        body: {
          message: 'Invalid incoming parameters',
        },
      });
    }
    console.log(
      '🚀 ~ file: api.ts ~ line 13 ~ action, date, user',
      action,
      date,
      user
    );
    const result = await addActivityService({ action, date, user });
    console.log('🚀 ~ file: api.ts ~ line 14 ~ result', result);
    return formatALBResult({
      statusCode: 200,
      body: {
        message: 'activity wrote',
      },
    });
  } catch (e) {
    console.log(`addActivityApi error: ${e}`);
    return formatALBResult({
      statusCode: 400,
      body: {
        error: e,
        message: e.message,
      },
    });
  }
};

export const addActivity = middyfy(addActivityApi);
