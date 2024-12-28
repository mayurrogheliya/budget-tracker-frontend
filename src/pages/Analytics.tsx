import { Space, Typography, Spin, Card } from "antd";
import React, { useEffect, useState } from "react";

const { Title } = Typography;

import {
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
  Chart as ChartJS,
} from "chart.js";
import { transactionAPI } from "../api/endpoints/transaction";
import { useTransactionStore } from "../store/useTransactionStore";
import AnalyticsCard from "../components/AnalyticsCard";

ChartJS.register(CategoryScale, LinearScale, ArcElement, ChartTooltip, Legend);

const Analytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  const { loading, setLoading } = useTransactionStore();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await transactionAPI.getAnalytics();
        console.log("API Response:", response);
        setAnalyticsData(response.data?.data);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [setLoading]);

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }} className="mt-5">
      <Title level={2}>Analytics</Title>
      <Card>
        <div className="flex justify-center items-center flex-wrap gap-10">
          {loading ? (
            <Spin tip="Loading..." size="large" />
          ) : analyticsData ? (
            <>
              <AnalyticsCard
                title="Income"
                amount={analyticsData.totalIncome}
                type="Income"
                chartData={{
                  labels: analyticsData.nameIncomeData,
                  datasets: [
                    {
                      label: "Income",
                      data: analyticsData.sepIncomeData,
                      backgroundColor: analyticsData.nameIncomeData.map(() =>
                        getRandomColor()
                      ),
                    },
                  ],
                  hoverOffset: 4,
                }}
              />
              <AnalyticsCard
                title="Expense"
                amount={analyticsData.totalExpense}
                type="Expense"
                chartData={{
                  labels: analyticsData.nameExpenseData,
                  datasets: [
                    {
                      label: "Expense",
                      data: analyticsData.sepExpenseData,
                      backgroundColor: analyticsData.nameExpenseData.map(() =>
                        getRandomColor()
                      ),
                    },
                  ],
                  hoverOffset: 4,
                }}
              />
              <AnalyticsCard
                title="Income vs Expense"
                amount={analyticsData.netAmount}
                type="Income vs Expense"
                chartData={{
                  labels: ["Income", "Expense"],
                  datasets: [
                    {
                      label: "Amount",
                      data: [
                        analyticsData.totalIncome,
                        analyticsData.totalExpense,
                      ],
                      backgroundColor: ["#2ecc71", "#e74c4c"],
                    },
                  ],
                  hoverOffset: 4,
                }}
              />
            </>
          ) : (
            <div>No analytics data available.</div>
          )}
        </div>
      </Card>
    </Space>
  );
};

export default Analytics;
