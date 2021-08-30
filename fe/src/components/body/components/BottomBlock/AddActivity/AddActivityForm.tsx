import { useMutation, useQueryClient } from 'react-query';
import { createActivity, QUERY_KEY, useGetActions } from '../../../requests';
import { Action } from '../../types';
import { Dropdown } from '../../../../Dropdown/Dropdown';
import { useState } from 'react';
import { DropdownItem } from '../../../../Dropdown';
import { Button } from '../../../../Button';

const getUniqueCategories = (actions: Action[] = []) => {
  const categories = new Set<string>();

  actions.forEach((action) => {
    categories.add(action.category);
  });

  return { categories: [...categories].filter(Boolean) };
};

export const AddActivityForm = (): JSX.Element => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      return createActivity({
        action: {
          action: selectedAction?.value ?? '',
          category: selectedCategory?.value ?? '',
          score: score ?? 0,
        },
        date: Date.now(),
        user: 'test',
      });
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries(QUERY_KEY.activities);
      },
    }
  );

  const { data, isLoading, error } = useGetActions();
  console.log('🚀 ~ file: AddActivityForm.tsx ~ line 21 ~ data', data);

  const { categories } = getUniqueCategories(data?.actions);

  const [selectedCategory, setSelectedCategory] = useState<DropdownItem | null>(
    null
  );
  const [selectedAction, setSelectedAction] = useState<DropdownItem | null>(
    null
  );

  const categoryActions: DropdownItem[] = (data?.actions ?? [])
    .filter((action) => action.category === selectedCategory?.value)
    .map((action) => ({ value: action.action }));

  const score = data?.actions?.find(
    (action) =>
      action.category === selectedCategory?.value &&
      action.action === selectedAction?.value
  )?.score;

  if (error) {
    return <div>Error occured during fetching actions</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Dropdown
        items={categories.map((category) => ({ value: category }))}
        defaultText="Select category"
        onChange={setSelectedCategory}
        selectedItem={selectedCategory}
      />
      <Dropdown
        items={categoryActions}
        defaultText="Select action"
        onChange={setSelectedAction}
        selectedItem={selectedAction}
        disabled={selectedCategory === null}
      />
      <span>{score}</span>
      <Button
        onClick={() => mutation.mutate()}
        isLoading={mutation.isLoading}
        isDisabled={
          selectedAction === null ||
          selectedCategory === null ||
          mutation.isLoading
        }
      >
        Add activity
      </Button>
    </div>
  );
};
