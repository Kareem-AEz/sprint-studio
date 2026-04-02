type HeadingProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function Heading({ title, description, action }: HeadingProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground text-base text-balance">
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
