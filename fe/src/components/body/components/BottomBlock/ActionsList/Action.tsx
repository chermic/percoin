import { Activity } from '../../types';

const Column = ({ children }: { children: React.ReactChild }): JSX.Element => (
  <div className="w-1/5 flex justify-center">{children}</div>
);

export const Action = ({ activity }: { activity: Activity }): JSX.Element => {
  return (
    <div className="border-b flex mb-5">
      <Column>
        <span className="mx-5 ">{activity?.action?.category}</span>
      </Column>
      <Column>
        <span>{activity?.action?.action}</span>
      </Column>
      <Column>
        <span>{activity?.action?.score}</span>
      </Column>
      <Column>
        <span>{activity?.user}</span>
      </Column>
    </div>
  );
};
