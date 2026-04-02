"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function TestErrorPage() {
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    // This will cause a render error that bubbles up
    throw new Error("This is a deliberate catastrophic error!");
  }

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-3xl font-bold">Testing Error Boundaries</h1>
      <div className="text-muted-foreground max-w-md space-y-4">
        <p>
          Clicking the button below will trigger a client-side exception during
          render.
        </p>
        <p className="bg-muted rounded-lg p-3 text-left font-mono text-sm">
          <strong>Note for Development:</strong> Next.js will intercept this
          with its built-in error overlay. To see your custom global error UI,
          you must click the &quot;X&quot; in the top right corner of the red
          overlay!
        </p>
      </div>

      <Button
        variant="destructive"
        size="lg"
        className="rounded-xl"
        onClick={() => setShouldCrash(true)}
      >
        Crash the App
      </Button>
    </div>
  );
}
