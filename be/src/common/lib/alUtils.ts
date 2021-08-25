import { ALBResult } from 'aws-lambda';

type Content = {
  statusCode: number;
  body?: Record<string, unknown>;
};

export const formatALBResult = ({ statusCode, body }: Content): ALBResult => {
  return { statusCode, body: JSON.stringify(body) };
};
