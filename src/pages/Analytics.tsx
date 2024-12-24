import { Flex, Space, Typography } from "antd";
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
import { Pie } from "react-chartjs-2";

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

const Analytics: React.FC = () => {
  return (
    <Space direction="vertical" style={{ width: "100%" }} className="mt-5">
      <Flex justify="start">
        <Title level={2}>Analytics</Title>
        <>
          <div
            style={{
              marginBottom: 16,
              width: "300px",
              height: "300px",
              marginTop: "80px",
            }}
          >
            <Pie data={chartData} options={{ responsive: true }} />
          </div>
        </>
      </Flex>
    </Space>
  );
};

export default Analytics;
