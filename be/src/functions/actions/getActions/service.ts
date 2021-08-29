import { DynamoDB } from '@common/lib/DynamoDB';
import { Converter } from 'aws-sdk/clients/dynamodb';

export const getActionsService = async () => {
  try {
    const dynamoDb = new DynamoDB();
    const TableName = process.env.ACTIONS_TABLE;
    console.log(
      '🚀 ~ file: service.ts ~ line 8 ~ getActionsService ~ TableName',
      TableName
    );

    const scanResponse = await dynamoDb.scan({ TableName });

    const formattedActions = scanResponse.Items.map((item) =>
      Converter.unmarshall(item)
    );
    console.log(
      '🚀 ~ file: service.ts ~ line 16 ~ getActionsService ~ formattedActions',
      formattedActions
    );
    return formattedActions;
  } catch (e) {
    throw e;
  }
};
