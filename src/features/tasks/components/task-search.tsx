"use client";

import { IconMagnifyingGlass } from "central-icons";
import { useQueryState } from "nuqs";
import { Input } from "@/components/ui/input";
import { tasksSearchParams } from "../lib/search-params";

export function TaskSearch() {
  const [q, setQ] = useQueryState("q", tasksSearchParams.q);

  return (
    <div className="relative w-full max-w-sm">
      <IconMagnifyingGlass className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
      <Input
        placeholder="Search tasks..."
        value={q || ""}
        onChange={(e) => setQ(e.target.value || null)}
        className="bg-background pl-9"
      />
    </div>
  );
}
