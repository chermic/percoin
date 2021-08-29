import { AWS } from '@serverless/typescript';

export type Functions = AWS['functions'];

export type IFunctionDefinition = Functions['string'];
