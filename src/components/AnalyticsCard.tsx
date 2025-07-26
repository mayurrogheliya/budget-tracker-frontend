import { Card, Typography } from "antd";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useThemeStore } from '../store/useThemeStore';

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
  const color = type === "Expense" ? "#e74c3c" : "#39f78a";
  const { theme } = useThemeStore();
  const labelColor = theme === 'dark' ? '#fff' : '#222';
  return (
    <Card className="w-72 md:w-80 bg-gray-100/70">
      <Title level={4} style={{ color, margin: 0 }}>
        {title}
      </Title>
      <Text style={{ fontSize: "20px", fontWeight: 600 }}>{`₹ ${amount}`}</Text>
      <div>
        <Doughnut
          data={chartData}
          style={{ width: "300px", height: "300px" }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: labelColor,
                  font: {
                    size: 14,
                  },
                },
              },
            },
            elements: {
              arc: {
                borderColor: theme === 'dark' ? '#bdbdbd' : '#e5e7eb',
                borderWidth: 4,
              },
            },
          }}
        />
      </div>
    </Card>
  );
};

export default AnalyticsCard;
