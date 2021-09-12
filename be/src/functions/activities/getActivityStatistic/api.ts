import { formatALBResult } from '@common/lib/alUtils';
import { middyfy } from '@common/lib/middy';
import { ALHandler } from '@common/types/AWSHandler';
import { getActivitiStatisticService } from './service';

const getActivitiesStatisticApi: ALHandler = async (event) => {
  try {
    const statistic = await getActivitiStatisticService();

    return formatALBResult({
      statusCode: 200,
      body: {
        favoriteActivity: statistic.favoriteActivity,
        idlenessDay: statistic.idlenessDay,
        bestCourse: statistic.bestCourse,
      },
    });
  } catch (e) {
    return formatALBResult({
      statusCode: 400,
      body: {
        error: JSON.stringify(e),
        message: e.message,
      },
    });
  }
};

export const getActivityStatistic = middyfy(getActivitiesStatisticApi);
