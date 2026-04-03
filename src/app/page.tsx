import { IconArrowRight } from "central-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PATHS } from "@/lib/paths";

export default function Home() {
  return (
    <div className="bg-background flex flex-1 flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4 text-center text-balance">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to Sprint Studio
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your projects and tasks with ease.
          </p>
        </div>

        <Button asChild variant="default" className="group">
          <Link href={PATHS.TASKS.href()} className="flex items-center gap-2">
            My Tasks
            <IconArrowRight className="size-4 transition-all duration-300 group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
