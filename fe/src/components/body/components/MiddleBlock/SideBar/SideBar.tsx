import { useGetActivityStatistic } from '../../../requests';

export const SideBar = () => {
  const { data, isLoading, isFetching, isError, error } =
    useGetActivityStatistic();

  if (isLoading || isFetching || isError) {
    return null;
  }

  const favoriteActivity = (
    <div>
      Ваше любимое действие - {data?.favoriteActivity?.action.action} из
      категории {data?.favoriteActivity?.action.category}
    </div>
  );

  return (
    <div className="h-full rounded bg-gray-300 w-2/6 p-5">
      {data?.favoriteActivity && favoriteActivity}
    </div>
  );
};
