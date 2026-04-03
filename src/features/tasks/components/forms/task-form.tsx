"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { TaskPriority, TaskStatus } from "@/generated/prisma/enums";
import { useToast } from "@/hooks/use-toast";
import { PATHS } from "@/lib/paths";
import { EMPTY_ACTION_STATE } from "@/response/action-state";
import { upsertTask } from "../../actions/upsert-task";
import { TaskFormSchema, taskFormSchema } from "../../schemas";
import { AssigneeSelect } from "./assignee-select";
import { CategorySelect } from "./category-select";
import { DateSelect } from "./date-select";

interface TaskFormProps {
  initialData?: Partial<TaskFormSchema> & { id: string };
  users: { id: string; name: string }[];
  categories: { id: string; name: string }[];
}

export function TaskForm({ initialData, users, categories }: TaskFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const taskId = initialData?.id ?? undefined;

  useEffect(() => {
    if (taskId) return router.prefetch(PATHS.TASK_DETAILS.href(taskId));

    return router.prefetch(PATHS.TASKS.href());
  }, [router, taskId]);

  const form = useForm<TaskFormSchema>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      assigneeIds: initialData?.assigneeIds ?? [],
      status: initialData?.status ?? TaskStatus.BACKLOG,
      priority: initialData?.priority ?? TaskPriority.MEDIUM,
      categoryId: initialData?.categoryId ?? "",
      startDate: initialData?.startDate ?? null,
      dueDate: initialData?.dueDate ?? null,
    },
  });

  return (
    <form
      action={async (formData) => {
        const isValid = await form.trigger();
        if (!isValid) return;

        startTransition(async () => {
          const result = await upsertTask(
            EMPTY_ACTION_STATE,
            formData,
            initialData?.id,
          );
          if (result.status === "SUCCESS") {
            toast.success(result.message ?? "Task saved successfully", {
              key: "task-saved",
            });
            if (taskId) {
              router.push(PATHS.TASK_DETAILS.href(taskId));
            } else {
              router.push(PATHS.TASKS.href());
            }
          } else {
            toast.error(result.error ?? "Failed to save task", {
              key: "task-error",
            });
          }
        });
      }}
      className="flex flex-col gap-6"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* Title */}
        <Controller
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="md:col-span-2">
              <FieldLabel>Title</FieldLabel>
              <FieldContent>
                <Input
                  {...field}
                  placeholder="Task title"
                  autoComplete="off"
                  className="bg-input/50 rounded-lg border-transparent"
                  aria-invalid={fieldState.invalid}
                />
                <FieldError errors={[fieldState.error]} />
              </FieldContent>
            </Field>
          )}
        />

        {/* Description */}
        <Controller
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="md:col-span-2">
              <FieldLabel>Description</FieldLabel>
              <FieldContent>
                <Textarea
                  {...field}
                  placeholder="Task description"
                  className="bg-input/50 h-full min-h-48 rounded-lg border-transparent"
                  aria-invalid={fieldState.invalid}
                />
                <FieldError errors={[fieldState.error]} />
              </FieldContent>
            </Field>
          )}
        />

        {/* Category */}
        <Controller
          control={form.control}
          name="categoryId"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Category</FieldLabel>
              <FieldContent>
                <CategorySelect
                  categories={categories}
                  value={field.value}
                  onChange={field.onChange}
                />
                <input type="hidden" name="categoryId" value={field.value} />
                <FieldError errors={[fieldState.error]} />
              </FieldContent>
            </Field>
          )}
        />

        {/* Assignees */}
        <Controller
          control={form.control}
          name="assigneeIds"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Assignees</FieldLabel>
              <FieldContent>
                <AssigneeSelect
                  users={users}
                  value={field.value}
                  onChange={field.onChange}
                />
                <input
                  type="hidden"
                  name="assigneeIds"
                  value={JSON.stringify(field.value)}
                />
                <FieldError errors={[fieldState.error]} />
              </FieldContent>
            </Field>
          )}
        />

        {/* Status */}
        <Controller
          control={form.control}
          name="status"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Status</FieldLabel>
              <FieldContent>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  name="status"
                >
                  <SelectTrigger className="bg-input/50 h-9 w-full rounded-lg border-transparent">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg">
                    {Object.values(TaskStatus).map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0) + status.slice(1).toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError errors={[fieldState.error]} />
              </FieldContent>
            </Field>
          )}
        />

        {/* Priority */}
        <Controller
          control={form.control}
          name="priority"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Priority</FieldLabel>
              <FieldContent>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  name="priority"
                >
                  <SelectTrigger className="bg-input/50 h-9 w-full rounded-lg border-transparent">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg">
                    {Object.values(TaskPriority).map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority.charAt(0) + priority.slice(1).toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError errors={[fieldState.error]} />
              </FieldContent>
            </Field>
          )}
        />

        {/* Dates */}
        <Controller
          control={form.control}
          name="startDate"
          render={({ field: startField }) => (
            <Controller
              control={form.control}
              name="dueDate"
              render={({ field: dueField, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="md:col-span-2"
                >
                  <FieldLabel>Dates</FieldLabel>
                  <FieldContent>
                    <DateSelect
                      value={{
                        from: startField.value ?? undefined,
                        to: dueField.value ?? undefined,
                      }}
                      onChange={(range) => {
                        startField.onChange(range?.from ?? null);
                        dueField.onChange(range?.to ?? null);
                      }}
                    />
                    <input
                      type="hidden"
                      name="startDate"
                      value={startField.value?.toISOString() ?? ""}
                    />
                    <input
                      type="hidden"
                      name="dueDate"
                      value={dueField.value?.toISOString() ?? ""}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </FieldContent>
                </Field>
              )}
            />
          )}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="submit" disabled={isPending}>
          {isPending && <Spinner data-icon="inline-start" />}
          {initialData?.id ? "Update Task" : "Create Task"}
        </Button>
      </div>
    </form>
  );
}
