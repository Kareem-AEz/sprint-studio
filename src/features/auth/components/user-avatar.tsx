import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { getAvatarColor, getInitials } from "../utils/avatar-color";

interface UserAvatarProps {
  /**
   * The name of the user to generate initials and background color from.
   */
  name: string | null;
  /**
   * Optional image URL for the user's avatar.
   */
  image?: string | null;
  /**
   * Optional boolean to indicate if the user data is still loading.
   */
  isLoading?: boolean;
  /**
   * Optional CSS class name for the avatar container.
   */
  className?: string;
  /**
   * Optional CSS class name for the fallback initials.
   */
  fallbackClassName?: string;
}

/**
 * A dedicated avatar component that automatically generates a unique background color
 * and initials based on the provided user name when no image is available.
 * Includes a skeleton state for loading.
 */
export function UserAvatar({
  name,
  image,
  isLoading,
  className,
  fallbackClassName,
}: UserAvatarProps) {
  if (isLoading) {
    return <Skeleton className={cn("size-8 rounded-full", className)} />;
  }

  if (!name) {
    return <Skeleton className={cn("size-8 rounded-full", className)} />;
  }

  const backgroundColor = getAvatarColor(name);
  const initials = getInitials(name);

  return (
    <Avatar className={cn("size-8 rounded-full text-xs", className)}>
      <AvatarImage src={image ?? undefined} alt={name} />
      <AvatarFallback
        className={cn("font-semibold text-white", fallbackClassName)}
        style={{ backgroundColor }}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
