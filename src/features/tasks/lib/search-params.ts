import { createSearchParamsCache, parseAsStringLiteral } from "nuqs/server";
import {
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
  viewParser: parseAsStringLiteral<TasksViewOption>(TASKS_VIEW_OPTIONS_LABELS)
    .withDefault("List")
    .withOptions({
      // Shallow: true (default) means changes won't trigger Server Component re-renders.
      // Set to false if you want the server to re-fetch data on change (e.g., re-running a database query).
      shallow: true,
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
