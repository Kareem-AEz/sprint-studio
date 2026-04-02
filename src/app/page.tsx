export default function Home() {
  return (
    <div className="bg-background flex flex-1 flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-2 text-center text-balance">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to Sprint Studio
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage your projects and tasks with ease.
        </p>
      </div>
    </div>
  );
}
