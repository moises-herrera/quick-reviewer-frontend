import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const ChartCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col gap-2">
          <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
        </CardTitle>
      </CardHeader>

      <CardContent className="min-h-[200px] w-full">
        <div className="flex flex-col gap-4">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
};
