import { Action } from '../actions/addActions/types';

export type Activity = {
  date: number;
  user: string;
  action: Action;
};
