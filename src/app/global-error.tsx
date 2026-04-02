"use client";

import "./globals.css";
import { IconExclamationTriangle } from "central-icons";
import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html
      lang="en"
      // Defaulting to dark mode for the global error to avoid white flashes
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col items-center justify-center">
        <div className="flex max-w-md flex-col items-center justify-center gap-6 p-6 text-center">
          <div className="bg-destructive/10 text-destructive flex size-16 items-center justify-center rounded-2xl">
            <IconExclamationTriangle className="size-10" />
          </div>

          <div className="space-y-2">
            <h1 className="flex flex-col items-center gap-2 text-3xl font-bold tracking-tight">
              System Failure
              <span
                className="text-destructive font-mono text-xl"
                aria-hidden="true"
              >
                {`(x_x)`}
              </span>
            </h1>
            <p className="text-muted-foreground">
              A catastrophic error occurred that crashed the application
              container.
              {error.digest && (
                <span className="mt-4 block font-mono text-xs opacity-70">
                  Digest ID: {error.digest}
                </span>
              )}
            </p>
          </div>

          <div className="mt-4 flex gap-3">
            <Button onClick={() => reset()} size="lg" className="rounded-xl">
              Attempt Recovery
            </Button>
            <Button
              onClick={() => (window.location.href = "/")}
              variant="outline"
              size="lg"
              className="rounded-xl"
            >
              Go Home
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
