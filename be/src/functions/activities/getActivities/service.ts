import { DynamoDB } from '@common/lib/DynamoDB';
import { Converter } from 'aws-sdk/clients/dynamodb';

const dynamoDb = new DynamoDB();

export const getActivitiesService = async () => {
  try {
    const TableName = process.env.ACTIONS_LOG_TABLE;
    console.log(
      '🚀 ~ file: service.ts ~ line 9 ~ getActivitiesService ~ TableName',
      TableName
    );
    const scanResult = await dynamoDb.scan({ TableName });
    const activities = Converter.unmarshall(scanResult.Items[0]);
    console.log(
      '🚀 ~ file: service.ts ~ line 11 ~ getActivitiesService ~ activities',
      activities
    );
    return activities;
  } catch (e) {
    throw e;
  }
};
