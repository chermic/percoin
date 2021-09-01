import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  onChange: ReactDatePickerProps<any>['onChange'];
  selected?: Date;
  maxDate?: Date;
  className?: string;
};

export const Datepicker = ({
  onChange,
  selected = new Date(),
  maxDate,
  className,
}: Props): JSX.Element => {
  return (
    <ReactDatePicker
      selected={selected}
      onChange={onChange}
      maxDate={maxDate}
      className={className}
    />
  );
};
