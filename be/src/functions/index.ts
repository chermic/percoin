import { Functions } from '@common/types/common';
import { addActions, getActions } from './actions';
import { getActivities, addActivity, getActivityStatistic } from './activities';

export const functions: Functions = {
  getActions,
  addActions,
  getActivities,
  addActivity,
  getActivityStatistic,
};
