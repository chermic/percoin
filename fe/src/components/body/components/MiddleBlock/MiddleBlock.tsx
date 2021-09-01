import { Chart } from './Chart';
import { SideBar } from './SideBar';

export const MiddleBlock = (): JSX.Element => {
  return (
    <div className="mt-10 flex justify-between">
      <Chart />
      <SideBar />
    </div>
  );
};
