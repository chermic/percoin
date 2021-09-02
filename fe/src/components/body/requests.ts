import { useQuery, UseQueryResult } from 'react-query';
import superagent from 'superagent';
import { endpoints } from '../../endpoints';
import { Action, Activity } from './components/types';

type UseFetchResult<Data = Record<string, unknown>> = {
  data: Data | undefined;
  error: unknown;
  isLoading: boolean;
  refetch?(): void;
};

export const QUERY_KEY = {
  actions: 'actions',
  activities: 'activities',
  favoriteActivity: 'favoriteActivity',
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

const getFavoriteActivity = async (): Promise<{
  activity: Activity;
} | null> => {
  try {
    const response = await superagent.get(
      endpoints.GET_FAVORITE_ACTIVITY ?? ''
    );

    return response.body;
  } catch (e) {
    throw e;
  }
};

export const useGetFavoriteActivity = () => {
  const queryResult = useQuery({
    queryFn: getFavoriteActivity,
    queryKey: QUERY_KEY.favoriteActivity,
    refetchOnWindowFocus: false,
  });

  return queryResult;
};

type UseGetActivitiesResponse = {
  activities: Activity[];
};

const getActivities = async (): Promise<{ activities: Activity[] }> => {
  try {
    const activities = await superagent.get(endpoints.GET_ACTIVITIES ?? '');
    return activities.body;
  } catch (e) {
    throw e;
  }
};

export const useGetActivities =
  (): UseFetchResult<UseGetActivitiesResponse> => {
    const { data, isFetching, isLoading, error, refetch } = useQuery<
      any,
      any,
      UseGetActivitiesResponse
    >(QUERY_KEY.activities, {
      queryFn: getActivities,
      refetchOnWindowFocus: false,
    });
    return { data, isLoading: isFetching || isLoading, error, refetch };
  };

type UseGetActionsResponse = {
  actions: Action[];
};

export const useGetActions = (): UseFetchResult<UseGetActionsResponse> => {
  const { data, isFetching, isLoading, error } = useQuery<
    any,
    any,
    UseGetActionsResponse
  >(QUERY_KEY.actions, {
    queryFn: getActions,
    refetchOnWindowFocus: false,
  });
  return { data, isLoading: isFetching || isLoading, error };
};
