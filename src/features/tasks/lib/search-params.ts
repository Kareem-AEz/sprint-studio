import {
  createSearchParamsCache,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";
import {
  TASK_PRIORITY_FILTER_OPTIONS,
  TASK_STATUS_FILTER_OPTIONS,
  TASKS_VIEW_OPTIONS_LABELS,
  TasksViewOption,
} from "./constants";

/**
 * --- Search Params Definitions ---
 * Centralized parsers for all task-related search parameters.
 */
export const tasksSearchParams = {
  // 1. View Switcher (List, Board, etc.)
  view: parseAsStringLiteral<TasksViewOption>(TASKS_VIEW_OPTIONS_LABELS)
    .withDefault("List")
    .withOptions({
      shallow: true,
    }),
  status: parseAsStringLiteral(TASK_STATUS_FILTER_OPTIONS)
    .withDefault("ALL")
    .withOptions({
      shallow: true,
    }),
  priority: parseAsStringLiteral(TASK_PRIORITY_FILTER_OPTIONS)
    .withDefault("ALL")
    .withOptions({
      shallow: true,
    }),
  q: parseAsString.withDefault("").withOptions({
    shallow: true,
    throttleMs: 300,
  }),
};

/**
 * --- Search Params Cache ---
 * Used to access search params in Server Components.
 */
export const tasksSearchParamsCache =
  createSearchParamsCache(tasksSearchParams);
