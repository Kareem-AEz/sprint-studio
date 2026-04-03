"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { startTransition, useActionState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { TaskPriority, TaskStatus } from "@/generated/prisma/enums";
import { PATHS } from "@/lib/paths";
import { ActionState, EMPTY_ACTION_STATE } from "@/response/action-state";
import { useActionFeedback } from "@/response/hooks/use-action-feedback";
import { upsertTask } from "../../actions/upsert-task";
import {
  TASK_PRIORITY_OPTIONS,
  TASK_STATUS_OPTIONS,
} from "../../lib/constants";
import { TaskFormSchema, taskFormSchema } from "../../schemas";
import { AssigneeSelect } from "./assignee-select";
import { CategorySelect } from "./category-select";
import { DateSelect } from "./date-select";

interface TaskFormProps {
  initialData?: Partial<TaskFormSchema> & { id?: string };
  users: { id: string; name: string }[];
  categories: { id: string; name: string }[];
}

export function TaskForm({ initialData, users, categories }: TaskFormProps) {
  const router = useRouter();
  const form = useForm<TaskFormSchema>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      assigneeIds: initialData?.assigneeIds ?? [],
      status: initialData?.status ?? TaskStatus.BACKLOG,
      priority: initialData?.priority ?? TaskPriority.LOW,
      categoryId: initialData?.categoryId ?? "",
      startDate: initialData?.startDate ?? null,
      dueDate: initialData?.dueDate ?? null,
    },
    mode: "onChange",
  });

  const [actionState, formAction, isPending] = useActionState(
    (prevState: ActionState, formData: FormData) =>
      upsertTask(prevState, formData, initialData?.id),
    EMPTY_ACTION_STATE,
  );

  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      toast.success(actionState.message);
      router.push(PATHS.TASKS.href());
      router.refresh();
    },
    onError: ({ actionState }) => {
      toast.error(actionState.error ?? "Something went wrong");
    },
  });

  return (
    <form
      action={async (formData) => {
        const isValid = await form.trigger();
        if (!isValid) return;

        // Append controlled fields
        formData.set(
          "assigneeIds",
          JSON.stringify(form.getValues("assigneeIds")),
        );

        startTransition(() => {
          formAction(formData);
        });
      }}
      className="flex w-full flex-1 flex-col gap-6"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Title */}
        <div className="md:col-span-2">
          <Controller
            control={form.control}
            name="title"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Title</FieldLabel>
                <FieldContent>
                  <Input
                    {...field}
                    placeholder="Task title"
                    autoComplete="off"
                  />
                  <FieldError errors={[fieldState.error]} />
                </FieldContent>
              </Field>
            )}
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Description</FieldLabel>
                <FieldContent>
                  <Textarea
                    {...field}
                    placeholder="Task description"
                    className="min-h-48"
                  />
                  <FieldError errors={[fieldState.error]} />
                </FieldContent>
              </Field>
            )}
          />
        </div>

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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-input/50 hover:bg-input/70 w-full justify-start rounded-3xl border-transparent"
                    >
                      {field.value}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 rounded-2xl">
                    <DropdownMenuRadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {TASK_STATUS_OPTIONS.map((status) => (
                        <DropdownMenuRadioItem
                          key={status}
                          value={status}
                          className="rounded-xl"
                        >
                          {status}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <input type="hidden" name="status" value={field.value} />
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-input/50 hover:bg-input/70 w-full justify-start rounded-3xl border-transparent"
                    >
                      {field.value}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 rounded-2xl">
                    <DropdownMenuRadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {TASK_PRIORITY_OPTIONS.map((priority) => (
                        <DropdownMenuRadioItem
                          key={priority}
                          value={priority}
                          className="rounded-xl"
                        >
                          {priority}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <input type="hidden" name="priority" value={field.value} />
                <FieldError errors={[fieldState.error]} />
              </FieldContent>
            </Field>
          )}
        />

        {/* Date Range */}
        <div className="md:col-span-2">
          <Field>
            <FieldLabel>Dates</FieldLabel>
            <FieldContent>
              <DateSelect
                value={{
                  from: form.watch("startDate") ?? undefined,
                  to: form.watch("dueDate") ?? undefined,
                }}
                onChange={(range) => {
                  form.setValue("startDate", range?.from ?? null);
                  form.setValue("dueDate", range?.to ?? null);
                }}
              />
              <input
                type="hidden"
                name="startDate"
                value={form.watch("startDate")?.toISOString() ?? ""}
              />
              <input
                type="hidden"
                name="dueDate"
                value={form.watch("dueDate")?.toISOString() ?? ""}
              />
            </FieldContent>
          </Field>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button disabled={isPending}>
          {isPending && <Spinner data-icon="inline-start" />}
          {initialData?.id ? "Update Task" : "Create Task"}
        </Button>
      </div>
    </form>
  );
}
