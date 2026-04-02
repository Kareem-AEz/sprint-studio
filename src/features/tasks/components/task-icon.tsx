type TaskIconProps = {
  taskKey: string;
};

export function TaskIcon({ taskKey }: TaskIconProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded text-sm font-bold">
        {taskKey.split("-")[0].charAt(0)}
      </div>
    </div>
  );
}
