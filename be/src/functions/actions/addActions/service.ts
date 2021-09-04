import { DynamoDB } from '@common/lib/DynamoDB';
import { Converter } from 'aws-sdk/clients/dynamodb';
import { Action } from './types';

export const addActionsService = async (action: Action) => {
  console.log(
    '🚀 ~ file: service.ts ~ line 40 ~ addActionService ~ action',
    action
  );
  console.log('start addActionService');
  try {
    const TableName = process.env.ACTIONS_TABLE ?? '';
    const dynamoDb = new DynamoDB();
    const Item = Converter.marshall(action);
    console.log(
      '🚀 ~ file: service.ts ~ line 42 ~ addActionService ~ actionsTable',
      TableName
    );
    console.log(
      '🚀 ~ file: service.ts ~ line 39 ~ addActionService ~ Item',
      Item
    );
    const result = await dynamoDb.putItem({
      TableName,
      Item,
    });
    console.log(
      '🚀 ~ file: service.ts ~ line 51 ~ addActionService ~ result',
      result
    );
    console.log('end addActionService');
    return result;
  } catch (e) {
    console.log('error addActionService');
    throw e;
  }
};
