"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/features/auth/components/user-avatar";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { EMPTY_ACTION_STATE } from "@/response/action-state";
import { useActionFeedback } from "@/response/hooks/use-action-feedback";
import { createActivity } from "../../actions/create-activity";
import {
  ActivityCommentFormSchema,
  activityCommentFormSchema,
} from "../../schemas";

export function ActivityCommentForm({ taskId }: { taskId: string }) {
  const { user } = useAuth();
  const form = useForm<ActivityCommentFormSchema>({
    resolver: zodResolver(activityCommentFormSchema),
    defaultValues: { content: "" },
  });
  const { toast } = useToast();

  const [actionState, formAction, isPending] = useActionState(
    (prevState: unknown, formData: FormData) => createActivity(formData),
    EMPTY_ACTION_STATE,
  );

  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      form.reset();
      toast.success(actionState.message ?? "Comment added", {
        key: "comment-added",
      });
    },
    onError: ({ actionState }) => {
      toast.error(actionState.error ?? "Failed to add comment", {
        key: "comment-error",
      });
    },
  });

  return (
    <div className="mt-auto flex flex-1 items-start gap-3">
      <UserAvatar name={user?.name ?? null} image={undefined} />
      <form
        action={async (formdata) => {
          const isValid = await form.trigger();
          if (!isValid) return;

          startTransition(() => {
            formAction(formdata);
          });
        }}
        // onSubmit={(e) => {
        //   form.handleSubmit(() => {
        //     // RHF validation passed, let the native form action proceed.
        //     // We don't call e.preventDefault() here so the 'action' fires.
        //   })(e);
        // }}
        className="w-full"
      >
        <div className="flex flex-col gap-2">
          {/* Hidden field for taskId so server action knows where to revalidate */}
          <input type="hidden" name="taskId" value={taskId} />

          <Controller
            control={form.control}
            name="content"
            render={({ field, fieldState }) => (
              <Field
                data-invalid={!!form.formState.errors.content}
                className="gap-2"
              >
                <FieldLabel className="sr-only">Comment</FieldLabel>
                <FieldContent>
                  <Textarea
                    {...field}
                    placeholder="Add a comment"
                    autoComplete="off"
                    className="text-muted-foreground h-48"
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldDescription>
                    Add a comment to this task.
                  </FieldDescription>
                  <FieldError errors={[fieldState.error]} />
                </FieldContent>
              </Field>
            )}
          />

          <Button className="mt-2 ml-auto" disabled={isPending}>
            {isPending && <Spinner data-icon="inline-start" />}
            {isPending ? "Adding..." : "Comment"}
          </Button>
        </div>
      </form>
    </div>
  );
}
