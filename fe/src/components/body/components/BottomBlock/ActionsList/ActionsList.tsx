import { useQuery } from 'react-query';
import { getActivities } from '../../../requests';
import { Action } from './Action';

export const ActionsList = () => {
  const { data, isLoading, error } = useQuery({
    queryFn: getActivities,
    refetchOnWindowFocus: false,
  });

  if (error) {
    return <div>Error occured during fetching actions</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data?.activities?.map((activity) => (
        <Action activity={activity} key={activity.date} />
      ))}
    </div>
  );
};
