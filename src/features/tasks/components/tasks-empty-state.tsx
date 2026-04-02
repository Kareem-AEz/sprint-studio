import { IconInboxEmpty, IconPlusSmall } from "central-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { PATHS } from "@/lib/paths";

export function TasksEmptyState() {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center p-8">
      <Empty className="border-none">
        <EmptyHeader className="gap-4">
          <EmptyMedia variant="icon" className="size-14">
            <IconInboxEmpty className="text-muted-foreground size-10" />
          </EmptyMedia>
          <EmptyTitle className="text-2xl font-semibold tracking-tight">
            No tasks found
          </EmptyTitle>
          <EmptyDescription className="flex max-w-[320px] flex-col gap-2 text-balance">
            Your sprint board is currently empty. Start by creating a new task
            to get the ball rolling!
            <span className="block font-mono text-xs opacity-70">
              {`( ・∀・)っ旦`}
            </span>
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button
            asChild
            variant="default"
            size="lg"
            className="mt-4 rounded-xl"
          >
            <Link href={PATHS.TASK_CREATE.href()}>
              <IconPlusSmall className="mr-1 size-5" />
              Create your first task
            </Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
