export const CardSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="h-4 w-1/2 rounded-md bg-muted animate-pulse" />
      <div className="h-4 w-1/4 rounded-md bg-muted animate-pulse" />
      <div className="h-4 w-1/4 rounded-md bg-muted animate-pulse" />
      <div className="h-4 w-1/4 rounded-md bg-muted animate-pulse" />
    </div>
  );
};
