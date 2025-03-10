import { Bar, BarChart, CartesianGrid, Cell, XAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { FC, useMemo } from 'react';
import { ChartData } from '../interfaces/chart-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartCardSkeleton } from './ChartCardSkeleton';
import { Button } from '@/components/ui/button';

interface DataByRepositoryChartProps {
  data?: ChartData;
  isLoading?: boolean;
  isError?: boolean;
  refetch: () => void;
}

export const DataByRepositoryChart: FC<DataByRepositoryChartProps> = ({
  data,
  isLoading,
  isError,
  refetch,
}) => {
  const chartData = data?.data || [];
  const mappedData = useMemo(
    () =>
      chartData.map(({ label, value }) => {
        return {
          label,
          value,
          color: 'var(--default-chart-color)',
        };
      }),
    [chartData]
  );

  if (!data || isLoading) {
    return <ChartCardSkeleton />;
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-red-500">Error loading chart</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[200px] w-full flex flex-col gap-y-3">
          <p>There was an error loading the chart data.</p>
          <Button variant="outline" onClick={refetch} className="w-fit">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={{}} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <ChartTooltip content={<ChartTooltipContent hideIndicator />} />
            <ChartLegend content={<ChartLegendContent />} />
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Bar dataKey="value" radius={4}>
              {mappedData.map(({ color }, index) => (
                <Cell key={`cell-${index}`} fill={color} stroke={color} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
