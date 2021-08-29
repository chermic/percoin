import { useQuery } from 'react-query';
import superagent from 'superagent';
import { endpoints } from '../../endpoints';
import { Action, Activity } from './components/types';

type UseFetchResult<Data = Record<string, unknown>> = {
  data: Data | undefined;
  error: unknown;
  isLoading: boolean;
};

const getActivities = async (): Promise<{ activities: Activity[] }> => {
  try {
    const activities = await superagent.get(endpoints.GET_ACTIVITIES ?? '');
    return activities.body;
  } catch (e) {
    throw e;
  }
};

const getActions = async (): Promise<{ actions: Action[] }> => {
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

type UseGetActivitiesResponse = {
  activities: Activity[];
};

export const useGetActivities =
  (): UseFetchResult<UseGetActivitiesResponse> => {
    const { data, isFetching, isLoading, error } = useQuery<
      any,
      any,
      UseGetActivitiesResponse
    >('activities', {
      queryFn: getActivities,
      refetchOnWindowFocus: false,
    });
    return { data, isLoading: isFetching || isLoading, error };
  };

type UseGetActionsResponse = {
  actions: Action[];
};

export const useGetActions = (): UseFetchResult<UseGetActionsResponse> => {
  const { data, isFetching, isLoading, error } = useQuery<
    any,
    any,
    UseGetActionsResponse
  >('actions', {
    queryFn: getActions,
    refetchOnWindowFocus: false,
  });
  return { data, isLoading: isFetching || isLoading, error };
};
