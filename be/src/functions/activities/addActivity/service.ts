import { DynamoDB } from '@common/lib/DynamoDB';
import { Converter } from 'aws-sdk/clients/dynamodb';
import { Activity } from '../types';

const dynamoDb = new DynamoDB();

export const addActivityService = async (activity: Activity) => {
  try {
    const TableName = process.env.ACTIONS_LOG_TABLE;
    const Item = Converter.marshall(activity);
    const result = await dynamoDb.putItem({ TableName, Item });
  } catch (e) {
    throw e;
  }
};
