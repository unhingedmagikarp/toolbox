import { useState, useEffect, useCallback } from "react";

interface WindowSize {
  width: number;
  height: number;
}

/**
 * A hook that tracks the current window size
 * @returns An object containing the current window width and height
 */
export const useWindowSize = (): WindowSize => {
  const getWindowSize = useCallback(
    (): WindowSize => ({
      width: window.innerWidth,
      height: window.innerHeight,
    }),
    []
  );

  const [windowSize, setWindowSize] = useState<WindowSize>(getWindowSize);

  useEffect(() => {
    let timeoutId: number | undefined;

    const handleResize = () => {
      if (timeoutId) {
        window.cancelAnimationFrame(timeoutId);
      }

      timeoutId = window.requestAnimationFrame(() => {
        setWindowSize(getWindowSize());
      });
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (timeoutId) {
        window.cancelAnimationFrame(timeoutId);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [getWindowSize]);

  return windowSize;
};

export default useWindowSize;
