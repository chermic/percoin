import { AWS } from '@serverless/typescript';

export type Functions = Required<AWS>['functions'];

export type IFunctionDefinition = Functions['string'];
