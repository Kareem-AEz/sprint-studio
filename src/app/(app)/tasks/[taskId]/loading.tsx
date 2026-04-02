import { Spinner } from "@/components/ui/spinner";

export default function TaskDetailsLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner />
    </div>
  );
}
