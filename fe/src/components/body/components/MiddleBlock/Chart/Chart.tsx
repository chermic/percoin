import { useGetActivities } from '../../../requests';

export const Chart = () => {
  const { data, isLoading, error } = useGetActivities();

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};
