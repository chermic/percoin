import { Activity } from '../../types';

export const Action = ({ activity }: { activity: Activity }): JSX.Element => {
  return (
    <div>
      <span>{activity?.action?.category}</span>
      <span>{activity?.action?.action}</span>
      <span>{activity?.action?.score}</span>
      <span>{activity?.user}</span>
    </div>
  );
};
