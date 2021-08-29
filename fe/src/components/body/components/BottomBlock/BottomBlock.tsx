import { ActionsList } from './ActionsList';
import { AddActivityForm } from './AddActivity/AddActivityForm';

export const BottomBlock = () => {
  return (
    <div>
      <AddActivityForm />
      <ActionsList />
    </div>
  );
};
