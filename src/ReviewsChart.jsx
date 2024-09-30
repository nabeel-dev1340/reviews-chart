import { useState } from "react";
import { X } from "lucide-react";
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
import ExpandIcon from "./Icons/ExpandIcon";

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
    color: "#0171DC",
  },
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-[120px] right-[600px] z-50">
      <div
        className="flex flex-col items-center bg-white rounded-[12px] relative border border-slate-200"
        style={{ width: "850px", paddingTop: "10px" }}
      >
        <button
          onClick={onClose}
          style={{ marginRight: "10px" }}
          className="self-end text-gray-500 hover:text-gray-700 mr-[10px]"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

const ChartComponent = ({ isExpanded = false, onExpand }) => {
  const chartWidth = isExpanded ? "800px" : "450px";
  const chartHeight = isExpanded ? "100%" : "180px";

  return (
    <Card>
      <CardHeader
        style={{
          fontFamily: "Poppins",
          paddingTop: isExpanded ? "0px" : "15px",
          marginLeft: isExpanded ? "" : "20px",
        }}
      >
        <div style={{ display: "flex", gap: "250px", alignItems: "center" }}>
          <div className="flex items-center gap-2">
            <CardTitle>Verified Reviews</CardTitle>
            <div
              style={{
                borderRadius: "10px",
                padding: "2px 8px 2px 8px",
                fontSize: "10px",
                border: "1px solid #e4ebf1",
                fontFamily: "Poppins",
                marginBottom: "5px",
              }}
            >
              Beta
            </div>
          </div>
          {!isExpanded && (
            <button
              onClick={onExpand}
              size="sm"
              style={{
                padding: "4px",
                borderRadius: "5px",
              }}
              className="border border-slate-300"
            >
              <ExpandIcon size={17} />
            </button>
          )}
        </div>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent style={{userSelect: "none"}}>
        <ChartContainer
          config={chartConfig}
          width={chartWidth}
          height={chartHeight}
        >
          <BarChart data={chartData} margin={{ top: 20 }}>
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
            <Bar dataKey="desktop" fill="#0171DC" radius={8}>
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
      <CardFooter
        className="flex-col items-start gap-2 text-sm"
        style={{
          fontFamily: "Poppins",
          fontSize: "10px",
          marginLeft: isExpanded? "10px":"20px",
          marginBottom: "10px",
          marginTop: "10px",
          userSelect: "none"
        }}
      >
        <div className="leading-none text-muted-foreground">
          Displaying reviews from the last 6 months, based on the most recent
          100 verified reviews
        </div>
      </CardFooter>
    </Card>
  );
};

export function ReviewsChart() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ChartComponent onExpand={() => setIsModalOpen(true)} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ChartComponent isExpanded={true} />
      </Modal>
    </>
  );
}
