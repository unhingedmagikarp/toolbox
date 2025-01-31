import { RefObject, useEffect, useRef } from "react";

type Handler = (event: MouseEvent | TouchEvent) => void;

interface UseClickOutsideOptions {
  enabled?: boolean;
  capture?: boolean;
  excludeScrollbar?: boolean;
}

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: Handler,
  options: UseClickOutsideOptions = {}
): RefObject<T> {
  const { enabled = true, capture = true, excludeScrollbar = false } = options;

  const ref = useRef<T>(null!) as RefObject<T>;
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) return;

    const element = ref.current;
    if (!element) return;

    const handleEvent = (event: MouseEvent | TouchEvent) => {
      if (!ref.current) return;

      if (excludeScrollbar) {
        const windowWidth = document.documentElement.clientWidth;
        const clickX =
          event instanceof MouseEvent
            ? event.clientX
            : event.touches[0].clientX;
        if (clickX >= windowWidth) return;
      }

      const target = event.target as Node;
      if (ref.current.contains(target)) return;

      savedHandler.current(event);
    };

    const eventOptions = { capture, passive: true };

    document.addEventListener("mousedown", handleEvent, eventOptions);
    document.addEventListener("touchstart", handleEvent, eventOptions);

    return () => {
      document.removeEventListener("mousedown", handleEvent, eventOptions);
      document.removeEventListener("touchstart", handleEvent, eventOptions);
    };
  }, [enabled, capture, excludeScrollbar]);

  return ref;
}
