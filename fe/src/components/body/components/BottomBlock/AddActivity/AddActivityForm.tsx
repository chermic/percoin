import { useMutation, useQueryClient } from 'react-query';
import { createActivity, QUERY_KEY, useGetActions } from '../../../requests';
import { Action } from '../../types';
import { Dropdown } from '../../../../Dropdown/Dropdown';
import React, { useState } from 'react';
import { DropdownItem } from '../../../../Dropdown';
import { Button } from '../../../../Button';
import { addDays } from 'date-fns';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const getUniqueCategories = (actions: Action[] = []) => {
  const categories = new Set<string>();

  actions.forEach((action) => {
    categories.add(action.category);
  });

  return { categories: [...categories].filter(Boolean) };
};

const Column = ({ children }: { children: React.ReactChild }): JSX.Element => (
  <div className="w-1/5 flex justify-center">{children}</div>
);

export const AddActivityForm = (): JSX.Element => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      return createActivity({
        action: {
          action: selectedAction?.value ?? '',
          category: selectedCategory?.value ?? '',
          score: score ?? 0,
          isService: false,
        },
        date: date.getTime(),
        user: 'test',
      });
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries(QUERY_KEY.activities);
        queryClient.invalidateQueries(QUERY_KEY.activityStatistic);
        setDate(new Date());
        setSelectedAction(null);
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
  const [date, setDate] = useState(new Date());

  const categoryActions: DropdownItem[] = (data?.actions ?? [])
    .filter((action) => action.category === selectedCategory?.value)
    .map((action) => ({ value: action.action }));

  const score =
    data?.actions?.find(
      (action) =>
        action.category === selectedCategory?.value &&
        action.action === selectedAction?.value
    )?.score ?? 0;

  if (error) {
    return <div>Error occured during fetching actions</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-between items-center">
      <Column>
        <Dropdown
          items={categories.map((category) => ({ value: category }))}
          defaultText="Select category"
          onChange={setSelectedCategory}
          selectedItem={selectedCategory}
        />
      </Column>
      <Column>
        <Dropdown
          items={categoryActions}
          defaultText="Select action"
          onChange={setSelectedAction}
          selectedItem={selectedAction}
          disabled={selectedCategory === null}
        />
      </Column>
      <Column>
        <span className="text-center">{score}</span>
      </Column>
      <Column>
        <ReactDatePicker
          selected={date}
          onChange={(date) => setDate(date as Date)}
          maxDate={addDays(new Date(), 1)}
          className="border-gray-200 border-2 rounded h-7 shadow-inner"
        />
      </Column>
      <Column>
        <Button
          onClick={() => mutation.mutate()}
          isLoading={mutation.isLoading}
          isDisabled={
            selectedAction === null ||
            selectedCategory === null ||
            mutation.isLoading
          }
          // className="rounded border border-gray-400 px-5 py-1 shadow"
          className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        >
          Add activity
        </Button>
      </Column>
    </div>
  );
};
