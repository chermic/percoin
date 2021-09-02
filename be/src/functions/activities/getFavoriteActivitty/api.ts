import { formatALBResult } from '@common/lib/alUtils';
import { middyfy } from '@common/lib/middy';
import { ALHandler } from '@common/types/AWSHandler';
import { getFavoriteActivityService } from './service';

const getFavoriteActivityApi: ALHandler = async (event) => {
  try {
    const favoriteActivity = await getFavoriteActivityService();

    return formatALBResult({
      statusCode: 200,
      body: {
        activity: favoriteActivity,
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

export const getFavoriteActivity = middyfy(getFavoriteActivityApi);
