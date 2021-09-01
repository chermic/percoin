import { ActionsList } from './ActionsList';
import { AddActivityForm } from './AddActivity/AddActivityForm';

export const BottomBlock = () => {
  return (
    <div className="mt-10">
      <AddActivityForm />
      <ActionsList />
    </div>
  );
};
