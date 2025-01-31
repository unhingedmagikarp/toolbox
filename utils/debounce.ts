/**
 * Creates a debounced version of a function
 * @param fn The function to debounce
 * @param delay The delay in milliseconds
 * @returns A debounced version of the function
 */
export const debounce = <Args extends unknown[], R>(
  fn: (...args: Args) => R,
  delay = 500
): ((...args: Args) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Args): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};
