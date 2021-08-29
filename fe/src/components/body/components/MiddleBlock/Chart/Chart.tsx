import { useQuery } from 'react-query';
import { getActivities } from '../../../requests';

export const Chart = () => {
  const { data, isLoading, isFetching, error } = useQuery({
    queryFn: getActivities,
    refetchOnWindowFocus: false,
  });

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};
