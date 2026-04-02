"use client";

import { IconAppearanceDarkMode } from "central-icons";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <IconAppearanceDarkMode className="size-6 transition-all! dark:rotate-180" />

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default ThemeSwitcher;
