type Props = {
  value: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>, value: string): void;
  loading?: boolean;
  disabled?: boolean;
  label?: string;
  type?: 'number' | 'text' | 'password';
  onClear?(): void;
};

export const Input = ({
  onChange,
  value,
  disabled,
  loading,
  onClear,
  label,
  type = 'text',
}: Props) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ): void => {
    onChange(e, e.target.value);
  };

  const input = (
    <input
      value={value}
      onChange={handleChange}
      disabled={disabled}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      placeholder={label ?? ''}
      type={type}
    />
  );

  return (
    <div>
      {label ? (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
          {input}
        </label>
      ) : (
        input
      )}
    </div>
  );
};
