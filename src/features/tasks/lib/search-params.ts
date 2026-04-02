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
 *
 * Usage in CLIENT components:
 * const [view, setView] = useQueryState('view', tasksSearchParams.viewParser)
 *
 * Usage in SERVER Pages (Next.js 15):
 * export default async function Page({ searchParams }: { searchParams: Promise<any> }) {
 *   const { view } = await tasksSearchParamsCache.parse(searchParams)
 * }
 */
export const tasksSearchParams = {
  view: parseAsStringLiteral<TasksViewOption>(TASKS_VIEW_OPTIONS_LABELS)
    .withDefault("List")
    .withOptions({
      shallow: true,
    }),
  status: parseAsStringLiteral(TASK_STATUS_FILTER_OPTIONS)
    .withDefault("ALL")
    .withOptions({
      shallow: false,
    }),
  priority: parseAsStringLiteral(TASK_PRIORITY_FILTER_OPTIONS)
    .withDefault("ALL")
    .withOptions({
      shallow: false,
    }),
  query: parseAsString.withDefault("").withOptions({
    shallow: false,
    limitUrlUpdates: {
      method: "debounce",
      timeMs: 350,
    },
  }),
};

/**
 * --- Search Params Cache ---
 * Used to access search params in Server Components without prop-drilling.
 *
 * Usage in NESTED Server Components:
 * const view = tasksSearchParamsCache.get('view')
 */
export const tasksSearchParamsCache =
  createSearchParamsCache(tasksSearchParams);
