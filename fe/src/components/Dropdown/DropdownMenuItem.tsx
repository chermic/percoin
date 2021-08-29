import { Menu } from '@headlessui/react';
import cn from 'classnames';
import { DropdownItem } from './types';

type Props = {
  item: DropdownItem;
  onClick(item: DropdownItem): void;
};

export const DropdownMenuItem = ({ item, onClick }: Props) => {
  return (
    <Menu.Item onClick={() => onClick(item)}>
      {({ active }) => (
        <span
          className={cn(
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'block px-4 py-2 text-sm'
          )}
        >
          {item.value}
        </span>
      )}
    </Menu.Item>
  );
};
