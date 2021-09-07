import { DynamoDB as AWSDynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export class DynamoDB {
  public dynamoDb: AWSDynamoDB;

  private documentClient: DocumentClient;

  constructor(params?: AWSDynamoDB.ClientConfiguration) {
    this.dynamoDb = new AWSDynamoDB(params);
    this.documentClient = new DocumentClient({ params });
  }

  public scan(params: AWSDynamoDB.ScanInput) {
    return this.dynamoDb.scan(params).promise();
  }

  public putItem(params: AWSDynamoDB.PutItemInput) {
    return this.dynamoDb.putItem(params).promise();
  }
}
