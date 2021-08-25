import { formatALBResult } from '@common/lib/alUtils';
import { middyfy } from '@common/lib/middy';
import { ALHandler } from '@common/types/AWSHandler';
import { getActivitiesService } from './service';

const getActivitiesApi: ALHandler = async (event) => {
  try {
    const activities = await getActivitiesService();
    console.log(
      '🚀 ~ file: api.ts ~ line 7 ~ constgetActivitiesApi:ALHandler= ~ activities',
      activities
    );
    return formatALBResult({
      statusCode: 200,
      body: { activities },
    });
  } catch (e) {
    console.log(`getActivitiesApi error: ${e}`);
    return formatALBResult({
      statusCode: 400,
      body: {
        error: e,
        message: e?.message,
      },
    });
  }
};

export const getActivities = middyfy(getActivitiesApi);
