import { ALBResult } from 'aws-lambda';

type Content = {
  statusCode: number;
  body?: Record<string, unknown>;
  headers?: Record<string, string | number | boolean>;
};

export const formatALBResult = ({
  statusCode,
  body,
  headers /*= {
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
  },*/,
}: Content): ALBResult => {
  return { statusCode, body: JSON.stringify(body), headers };
};
