import { useEffect, useRef, useState } from "react";
const hasIntersectionObserver: boolean =
  "IntersectionObserver" in window &&
  "IntersectionObserverEntry" in window &&
  "isIntersecting" in window.IntersectionObserverEntry.prototype;

export function useOnWhenVisible<E extends HTMLElement>(
  alwaysVisible: boolean
) {
  const ref = useRef<E>(null);
  const [isVisible, setIsVisible] = useState<boolean>(
    alwaysVisible || !hasIntersectionObserver
  );

  useEffect(() => {
    // it's just done once
    if (ref == null || isVisible) {
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
        setIsVisible(entry.isIntersecting);
    });

    observer.observe(ref.current!);
    return () => {
      observer.disconnect();
    };
  }, [setIsVisible,  isVisible]);

  return [ref, isVisible] as const;
}
