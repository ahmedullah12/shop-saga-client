import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Sales = {
  month: string;
  sales: number;
};

const SalesChart = ({ salesData }: { salesData: Sales[] }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Monthly Product Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 max-w-[60vw]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#1d70a2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
