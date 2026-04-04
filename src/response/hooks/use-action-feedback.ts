import { useEffect, useRef } from "react";
import { ActionState } from "../action-state";

type OnArgs = {
  actionState: ActionState;
};

type UseActionFeedbackOptions = {
  onSuccess?: (onArgs: OnArgs) => void;
  onError?: (onArgs: OnArgs) => void;
};

export const useActionFeedback = (
  actionState: ActionState,
  options: UseActionFeedbackOptions,
) => {
  const previousTimestampRef = useRef<number>(0);

  useEffect(() => {
    // Only process if actionState has actually changed and is not the initial state
    if (
      actionState.timestamp === 0 ||
      previousTimestampRef.current === actionState.timestamp
    ) {
      return;
    }

    if (actionState.status === "SUCCESS") {
      options.onSuccess?.({
        actionState,
      });
    }

    if (actionState.status === "ERROR") {
      options.onError?.({
        actionState,
      });
    }

    previousTimestampRef.current = actionState.timestamp;
  }, [actionState, options]);
};
