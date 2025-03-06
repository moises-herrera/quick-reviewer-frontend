const list = Array.from({ length: 10 });

export const TableSkeleton = () => {
  return (
    <div className="flex flex-col">
      {list.map((_, index) => (
        <div
          key={index}
          className="flex w-full animate-pulse items-center justify-between rounded-md bg-background p-4 pl-0"
        >
          <div className="h-4 w-1/2 rounded-md bg-muted" />
          <div className="h-4 w-1/4 rounded-md bg-muted" />
        </div>
      ))}
    </div>
  );
};
