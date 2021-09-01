import { useGetActivities } from '../../../requests';

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { differenceInCalendarDays } from 'date-fns';

const DEFAULT_SCORE_SUM = 5_000;
const DECREASE_PER_DAY = 100;

export const Chart = () => {
  const { data, isLoading, error } = useGetActivities();

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // const graphData = [
  //   { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
  //   { name: 'Page B', uv: 300, pv: 3400, amt: 3400 },
  //   { name: 'Page C', uv: 300, pv: 3400, amt: 3400 },
  //   { name: 'Page D', uv: 200, pv: 3400, amt: 3400 },
  //   { name: 'Page E', uv: 700, pv: 3400, amt: 3400 },
  // ];

  const graphData = data?.activities
    .sort((a, b) => a.date - b.date)
    .map((activity, i, activities) => {
      const scoreSumm = activities
        .slice(0, i)
        .reduce(
          (acc, activity) => (acc += activity.action.score),
          DEFAULT_SCORE_SUM
        );
      return {
        name: new Date(activity.date).toLocaleDateString().slice(0, -5),
        timestamp: activity.date,
        uv: scoreSumm,
      };
    });

  const renderLineChart = (
    <LineChart
      width={600}
      height={400}
      data={graphData}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );

  return <div>{renderLineChart}</div>;
};
