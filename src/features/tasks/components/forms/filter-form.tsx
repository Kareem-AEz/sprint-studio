"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryStates } from "nuqs";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  TASK_PRIORITY_FILTER_OPTIONS,
  TASK_STATUS_FILTER_OPTIONS,
} from "../../lib/constants";
import { tasksSearchParams } from "../../lib/search-params";
import { FilterSelect } from "../filter-select";

const filterFormSchema = z.object({
  status: z.enum(TASK_STATUS_FILTER_OPTIONS),
  priority: z.enum(TASK_PRIORITY_FILTER_OPTIONS),
});

type FilterFormValues = z.infer<typeof filterFormSchema>;

export function FilterForm() {
  const [queryParams, setQueryParams] = useQueryStates(tasksSearchParams);

  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      status: queryParams.status,
      priority: queryParams.priority,
    },
  });

  const onSubmit = (values: FilterFormValues) => {
    setQueryParams({
      priority: values.priority,
      status: values.status,
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <Controller
          name="status"
          control={form.control}
          render={({ field }) => (
            <FilterSelect
              label="Status"
              value={field.value}
              options={TASK_STATUS_FILTER_OPTIONS}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="priority"
          control={form.control}
          render={({ field }) => (
            <FilterSelect
              label="Priority"
              value={field.value}
              options={TASK_PRIORITY_FILTER_OPTIONS}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <Button
        type="submit"
        className="w-full font-mono text-xs tracking-widest"
      >
        APPLY FILTERS
      </Button>
    </form>
  );
}
