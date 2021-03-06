import { Functions } from '@common/types/common';
import { addActions, getActions } from './actions';
import {
  getActivities,
  addActivity,
  getActivityStatistic,
  dailyPenalty,
} from './activities';

export const functions: Functions = {
  getActions,
  addActions,
  getActivities,
  addActivity,
  getActivityStatistic,
  dailyPenalty,
};
