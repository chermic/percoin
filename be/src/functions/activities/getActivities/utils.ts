export const isInteger = (value: string): boolean =>
  !isNaN(parseInt(value, 10));
