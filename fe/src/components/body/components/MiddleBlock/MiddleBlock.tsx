import { Chart } from './Chart';
import { SideBar } from './SideBar';

export const MiddleBlock = (): JSX.Element => {
  return (
    <div>
      <Chart />
      <SideBar />
    </div>
  );
};
