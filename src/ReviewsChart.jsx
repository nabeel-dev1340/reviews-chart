import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart with a label";

const chartData = [
  { month: "January", desktop: 186, year: 2023 },
  { month: "February", desktop: 305, year: 2023 },
  { month: "March", desktop: 237, year: 2023 },
  { month: "April", desktop: 73, year: 2023 },
  { month: "May", desktop: 209, year: 2023 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2662D9",
  },
};

export function ReviewsChart() {
  return (
    <Card>
      <CardHeader>
        <div style={{display:"flex", alignItems:"center", gap:"12px"}}>
          <CardTitle>Verified Reviews</CardTitle>
          <div style={{borderRadius:"10px", padding:"2px 8px 2px 8px",fontSize:"10px", border:"1px solid #e4ebf1"}}>Beta</div>
        </div>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="#2662D9" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
