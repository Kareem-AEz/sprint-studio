import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useOnUnmount } from "./use-on-unmount";

const DEFAULT_FALLBACK_MS = 3000;

/**
 * Options for triggering toast notifications on unmount.
 */
type TriggerToastOnUnmountOptions = {
  key?: string;
  fallbackMs?: number;
  onFallback?: () => void;
};

/**
 * A specialized hook for triggering toast notifications that are
 * perfectly synchronized with a component's removal from the DOM.
 */
export function useUnmountToast() {
  const { toast } = useToast();
  const stateRef = useRef({ isPending: false, message: "", key: "" });
  const isMountedRef = useRef(true);

  // Mark mount status for the fallback safety timeout
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Use our new primitive hook for the unmount logic
  useOnUnmount(() => {
    if (stateRef.current.isPending) {
      toast.success(stateRef.current.message, { key: stateRef.current.key });
    }
  });

  const triggerToastOnUnmount = (
    message: string,
    options?: TriggerToastOnUnmountOptions,
  ) => {
    stateRef.current = { isPending: true, message, key: options?.key ?? "" };

    // Safety fallback: if the component never unmounts (e.g. navigation fails or takes too long)
    setTimeout(() => {
      if (isMountedRef.current && stateRef.current.isPending) {
        toast.success(stateRef.current.message, { key: stateRef.current.key });
        stateRef.current.isPending = false; // Prevent double toast
        options?.onFallback?.();
      }
    }, options?.fallbackMs ?? DEFAULT_FALLBACK_MS);
  };

  return triggerToastOnUnmount;
}
