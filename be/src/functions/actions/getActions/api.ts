import { formatALBResult } from '@common/lib/alUtils';
import { middyfy } from '@common/lib/middy';
import { ALHandler } from '@common/types/AWSHandler';
import { getActionsService } from './service';

const getActionsApi: ALHandler = async (event) => {
  try {
    const actions = await getActionsService();
    console.log(
      '🚀 ~ file: api.ts ~ line 9 ~ constgetActionsApi:ALHandler= ~ actions',
      actions
    );
    return formatALBResult({
      statusCode: 200,
      body: { actions },
    });
  } catch (e) {
    console.log(`getActionsApi error: ${e}`);
    return formatALBResult({
      statusCode: 400,
      body: {
        error: e,
        message: 'error occured during getActions',
      },
    });
  }
};

export const getActions = middyfy(getActionsApi);
