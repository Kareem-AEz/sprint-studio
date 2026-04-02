import ThemeSwitcher from "@/components/theme/theme-switcher";

export default function Home() {
  return (
    <div className="bg-background flex flex-1 flex-col items-center justify-center">
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center justify-between px-16 py-32">
        <ThemeSwitcher />
      </main>
    </div>
  );
}
