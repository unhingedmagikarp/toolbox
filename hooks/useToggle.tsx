import { useState, useCallback } from "react";

/**
 * A simple boolean toggle hook
 * @param initial - Initial boolean value (defaults to false)
 * @returns [value, toggleFn]
 */
export const useToggle = (initial = false): [boolean, () => void] => {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((v) => !v), []);

  return [value, toggle];
};
