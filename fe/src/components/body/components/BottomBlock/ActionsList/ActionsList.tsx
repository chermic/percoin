import { useGetActivities } from '../../../requests';
import { Action } from './Action';

export const ActionsList = () => {
  const { data, isLoading, error } = useGetActivities();

  if (error) {
    return <div>Error occured during fetching actions</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-5">
      {data?.activities?.map((activity) => (
        <Action activity={activity} key={activity.date} />
      ))}
    </div>
  );
};
