import { useCallback, useRef, useEffect } from "react";
import { debounce } from "../utils/debounce";

type DebouncedFunction<Args extends unknown[], R> = (...args: Args) => void;

type CallbackRef<Args extends unknown[], R> = {
  current: (...args: Args) => R;
};

/**
 * Creates a debounced version of a callback that persists across renders
 * @param callback The function to debounce
 * @param delay The delay in milliseconds
 * @returns A memoized, debounced version of the callback
 */
export const useDebounce = <Args extends unknown[], R>(
  callback: (...args: Args) => R,
  delay = 500
): DebouncedFunction<Args, R> => {
  const callbackRef: CallbackRef<Args, R> = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    debounce<Args, R>(
      (...args: Args): R => callbackRef.current(...args),
      delay
    ),
    [delay]
  );
};
