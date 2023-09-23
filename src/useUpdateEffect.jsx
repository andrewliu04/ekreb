import { useEffect, useRef } from "react";

export function useUpdateEffect(effect, deps) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      return effect();
    }
  }, deps);
}
