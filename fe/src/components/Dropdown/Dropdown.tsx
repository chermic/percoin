import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Fragment } from 'react';
import { DropdownMenuItem } from './DropdownMenuItem';
import { DropdownItem } from './types';
import cn from 'classnames';

type Props = {
  items: DropdownItem[];
  selectedItem: DropdownItem | null;
  defaultText: string;
  disabled?: boolean;
  onChange(item: DropdownItem): void;
};

export const Dropdown = ({
  items,
  onChange,
  selectedItem,
  defaultText,
  disabled,
}: Props): JSX.Element => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          disabled={disabled}
          className={cn(
            'inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700',
            disabled
              ? 'bg-gray-300 cursor-not-allowed'
              : 'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
          )}
        >
          {selectedItem?.value || defaultText}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {items.map((item) => (
              <DropdownMenuItem
                key={item.value}
                item={item}
                onClick={disabled ? () => null : onChange}
              />
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
