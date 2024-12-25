import { Space, Typography } from "antd";
import React from "react";

const { Title } = Typography;

import {
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
  Chart as ChartJS,
} from "chart.js";
import AnalyticsCard from "../components/AnalyticsCard";

// Register all necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, ArcElement, ChartTooltip, Legend);

const chartData = {
  labels: ["Income", "Expense"],
  datasets: [
    {
      label: "Amount",
      data: [1000, 500],
      backgroundColor: ["#2ecc71", "#e74c3c"],
    },
  ],
  hoverOffset: 4,
};

const incomeData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Income",
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: ["#2ecc71"],
    },
  ],
  hoverOffset: 4,
};

const expenseData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Expense",
      data: [28, 48, 40, 19, 86, 27],
      backgroundColor: ["#e74c3c"],
    },
  ],
  hoverOffset: 4,
};

const Analytics: React.FC = () => {
  return (
    <Space direction="vertical" style={{ width: "100%" }} className="mt-5">
      <Title level={2}>Analytics</Title>
      <div className="flex justify-center items-center flex-wrap gap-10">
        <AnalyticsCard
          title="Income"
          amount={200}
          type="income"
          chartData={incomeData}
        />
        <AnalyticsCard
          title="Expense"
          amount={500}
          type="expense"
          chartData={expenseData}
        />
        <AnalyticsCard
          title="Total Income vs Expense"
          amount={700}
          type="total"
          chartData={chartData}
        />
      </div>
    </Space>
  );
};

export default Analytics;
