import { DynamoDB as AWSDynamoDB } from 'aws-sdk';

export class DynamoDB {
  public dynamoDb: AWSDynamoDB;

  constructor(params?: AWSDynamoDB.ClientConfiguration) {
    this.dynamoDb = new AWSDynamoDB(params);
  }

  public scan(params: AWSDynamoDB.ScanInput) {
    return this.dynamoDb.scan(params).promise();
  }

  public putItem(params: AWSDynamoDB.PutItemInput) {
    return this.dynamoDb.putItem(params).promise();
  }
}
