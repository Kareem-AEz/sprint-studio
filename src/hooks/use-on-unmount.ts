import { useEffect, useRef } from "react";

/**
 * A primitive hook that executes a callback exactly once when the component unmounts.
 * We use a ref for the callback to ensure the unmount handler always has access
 * to the latest closure/values without needing to re-run the effect.
 */
export function useOnUnmount(callback: () => void) {
  const cbRef = useRef(callback);

  // Always keep the ref in sync with the latest version of the callback
  useEffect(() => {
    cbRef.current = callback;
  }, [callback]);

  // The "Once and Only Once" lifecycle effect
  useEffect(() => {
    return () => {
      cbRef.current();
    };
  }, []);
}
