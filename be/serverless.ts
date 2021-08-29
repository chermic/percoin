import type { AWS } from '@serverless/typescript';
import { functions } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'percoin',
  frameworkVersion: '2',
  variablesResolutionMode: '20210326',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    actionsTable: {
      Ref: 'ActionsTable',
    },
    actionsLogTable: {
      Ref: 'ActionsLogTable',
    },
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    lambdaHashingVersion: '20201221',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      ACTIONS_TABLE: '${self:custom.actionsTable}',
      ACTIONS_LOG_TABLE: '${self:custom.actionsLogTable}',
    },
    iam: {
      role: {
        name: 'ActionsTableReadWriteRole',
        statements: [
          {
            Sid: 'ActionsTableReadWriteRole',
            Effect: 'Allow',
            Action: [
              'dynamodb:BatchGet*',
              'dynamodb:DescribeStream',
              'dynamodb:DescribeTable',
              'dynamodb:Get*',
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:BatchWrite*',
              'dynamodb:CreateTable',
              'dynamodb:Delete*',
              'dynamodb:Update*',
              'dynamodb:PutItem',
            ],
            Resource: [
              {
                'Fn::GetAtt': ['ActionsTable', 'Arn'],
              },
              {
                'Fn::GetAtt': ['ActionsLogTable', 'Arn'],
              },
            ],
          },
        ],
      },
    },
  },
  resources: {
    Resources: {
      ActionsTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:service}_actions',
          AttributeDefinitions: [
            { AttributeName: 'category', AttributeType: 'S' },
            { AttributeName: 'action', AttributeType: 'S' },
          ],
          KeySchema: [
            { AttributeName: 'category', KeyType: 'HASH' },
            { AttributeName: 'action', KeyType: 'RANGE' },
          ],
          ProvisionedThroughput: {
            WriteCapacityUnits: 1,
            ReadCapacityUnits: 1,
          },
        },
      },
      ActionsLogTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:service}_actions-log',
          AttributeDefinitions: [
            { AttributeName: 'date', AttributeType: 'N' },
            { AttributeName: 'user', AttributeType: 'S' },
          ],
          KeySchema: [
            { AttributeName: 'date', KeyType: 'HASH' },
            { AttributeName: 'user', KeyType: 'RANGE' },
          ],
          ProvisionedThroughput: {
            WriteCapacityUnits: 1,
            ReadCapacityUnits: 1,
          },
        },
      },
    },
  },
  functions,
};

module.exports = serverlessConfiguration;
