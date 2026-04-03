import { ZodError } from "zod";

export type ActionState<T = unknown> = {
  status: "SUCCESS" | "ERROR";
  error?: string;
  message?: string;
  data?: T;
  timestamp: number;
};

export const EMPTY_ACTION_STATE: ActionState<unknown> = {
  status: "SUCCESS",
  data: undefined,
  error: undefined,
  message: undefined,
  timestamp: Date.now(),
};

export const toErrorActionState = (error: unknown): ActionState<unknown> => {
  if (error instanceof ZodError) {
    return {
      status: "ERROR",
      error: error.message,
      timestamp: Date.now(),
    };
  } else if (error instanceof Error) {
    return {
      status: "ERROR",
      error: error.message,
      timestamp: Date.now(),
      message: error.message,
    };
  } else {
    return {
      status: "ERROR",
      error: "An unknown error occurred",
      timestamp: Date.now(),
      message: "An unknown error occurred",
    };
  }
};

export const toSuccessActionState = (message: string): ActionState<unknown> => {
  return {
    status: "SUCCESS",
    message,
    timestamp: Date.now(),
  };
};
