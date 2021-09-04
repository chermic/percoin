import { formatALBResult } from '@common/lib/alUtils';
import { middyfy } from '@common/lib/middy';
import { ALHandler } from '@common/types/AWSHandler';
import { getActivitiesService } from './service';
import { isInteger } from './utils';

type GetActivitiesQueryParams = {
  startDate?: string;
  endDate?: string;
  user?: string;
};

const validateParams = (
  options: GetActivitiesQueryParams | null | undefined
): boolean => {
  if (!options) {
    return true;
  }
  const { endDate, startDate, user } = options;
  if (endDate !== undefined && !isInteger(endDate)) {
    return false;
  }
  if (startDate !== undefined && !isInteger(startDate)) {
    return false;
  }
  if (typeof user !== 'undefined' && typeof user !== 'string') {
    return false;
  }

  return true;
};

const getActivitiesApi: ALHandler<unknown, GetActivitiesQueryParams | null> =
  async (event) => {
    try {
      const isParamsValid = validateParams(event.queryStringParameters);
      if (!isParamsValid) {
        return formatALBResult({
          statusCode: 400,
          body: {
            message: 'Incoming parameters are not valid',
          },
        });
      }
      const activities = await getActivitiesService(
        event.queryStringParameters ?? {}
      );
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
