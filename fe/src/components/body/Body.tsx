import { Router } from 'react-router-dom';
import { history } from '../../router';
import { BottomBlock } from './components/BottomBlock';
import { MiddleBlock } from './components/MiddleBlock';

export const Body = (): JSX.Element => {
  return (
    <div>
      <MiddleBlock />
      <BottomBlock />
    </div>
  );
};
