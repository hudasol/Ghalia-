import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    (<div
      className={cn("animate-pulse rounded-md bg-ghalia-gold/5 animate-shimmer bg-gradient-to-r from-transparent via-ghalia-gold/10 to-transparent bg-[length:200%_100%]", className)}
      {...props} />)
  );
}

export { Skeleton }
