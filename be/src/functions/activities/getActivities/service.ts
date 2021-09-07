import { DynamoDB } from '@common/lib/DynamoDB';
import { Converter } from 'aws-sdk/clients/dynamodb';
import { Activity } from '../types';

const filterActivitiesByParams = (
  activities: Activity[],
  options: {
    startDate?: number;
    endDate?: number;
    user?: string;
  }
) => {
  const { endDate, startDate, user } = options;
  return activities
    .filter(({ date }) =>
      typeof startDate === 'number' ? date >= startDate : true
    )
    .filter(({ date }) =>
      typeof endDate === 'number' ? date <= endDate : true
    )
    .filter((activity) =>
      typeof user === 'string' ? user === activity.user : true
    );
};

const dynamoDb = new DynamoDB();

type GetActivitiesServiceParams = {
  startDate?: string;
  endDate?: string;
  user?: string;
};

export const getActivitiesService = async (
  options: GetActivitiesServiceParams | null | undefined = {}
) => {
  try {
    const { endDate, startDate, user } = options || {};
    const TableName = process.env.ACTIONS_LOG_TABLE ?? '';
    console.log(
      '🚀 ~ file: service.ts ~ line 9 ~ getActivitiesService ~ TableName',
      TableName
    );
    const scanResult = await dynamoDb.scan({ TableName });
    console.log(
      '🚀 ~ file: service.ts ~ line 14 ~ getActivitiesService ~ scanResult',
      scanResult.Items
    );
    const activities = scanResult.Items?.map((item) =>
      Converter.unmarshall(item)
    );
    const filteredActivities = filterActivitiesByParams(
      activities as Activity[],
      {
        endDate: endDate ? parseInt(endDate, 10) : undefined,
        startDate: startDate ? parseInt(startDate, 10) : undefined,
        user,
      }
    );
    console.log(
      '🚀 ~ file: service.ts ~ line 61 ~ filteredActivities',
      filteredActivities
    );
    console.log(
      '🚀 ~ file: service.ts ~ line 11 ~ getActivitiesService ~ activities',
      activities
    );
    return filteredActivities.sort((a, b) => a.date - b.date);
  } catch (e) {
    throw e;
  }
};
