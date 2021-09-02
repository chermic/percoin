import { useGetFavoriteActivity } from '../../../requests';

export const SideBar = () => {
  const { data, isLoading, isFetching, isError, error } =
    useGetFavoriteActivity();

  if (isLoading || isFetching || isError) {
    return null;
  }

  return (
    <div className="h-full rounded bg-gray-300 w-2/6 p-5">
      <div>
        Ваше любимое действие - {data?.activity?.action.action} из категории{' '}
        {data?.activity?.action.category}
      </div>
    </div>
  );
};
