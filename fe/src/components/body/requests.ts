import superagent from 'superagent';
import { endpoints } from '../../endpoints';
import { Action, Activity } from './components/types';

export const getActivities = async (): Promise<{ activities: Activity[] }> => {
  try {
    const activities = await superagent.get(endpoints.GET_ACTIVITIES ?? '');
    return activities.body;
  } catch (e) {
    throw e;
  }
};

export const getActions = async (): Promise<{ actions: Action[] }> => {
  try {
    const actions = await superagent.get(endpoints.GET_ACTIONS ?? '');

    return actions.body;
  } catch (e) {
    throw e;
  }
};

export const createActions = async (actions: Action[]) => {
  const result = await superagent
    .post(endpoints.ADD_ACTIONS ?? '')
    .send(actions);

  return result;
};

export const createActivity = async (activity: Activity) => {
  const response = await superagent
    .post(endpoints.ADD_ACTIVITY ?? '')
    .send(activity);

  return response;
};
