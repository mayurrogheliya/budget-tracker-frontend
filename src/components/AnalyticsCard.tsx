import { Card, Typography } from "antd";
import React from "react";
import { Doughnut } from "react-chartjs-2";

interface AnalyticsCardProps {
  title: string;
  amount: number;
  type: string;
  chartData: any;
}

const { Title, Text } = Typography;

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  amount,
  type,
  chartData,
}) => {
  const color = type === "Expense" ? "#e74c3c" : "#2ecc71";
  return (
    <Card className="w-72 md:w-80 bg-gray-100/70">
      <Title level={4} style={{ color, margin: 0 }}>
        {title}
      </Title>
      <Text style={{ fontSize: "20px", fontWeight: 600 }}>{`$${amount}`}</Text>
      <div>
        <Doughnut
          data={chartData}
          style={{ width: "300px", height: "300px" }}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </Card>
  );
};

export default AnalyticsCard;
