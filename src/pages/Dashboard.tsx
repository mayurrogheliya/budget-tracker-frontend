import React from "react";
import TransactionForm from "../components/TransactionForm";
import { Button, Flex, Space, Typography } from "antd";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { useTransactionStore } from "../store/useTransactionStore";
import TransactionTable from "../components/TransactionTable";

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const { mode, setMode } = useTransactionStore();
  return (
    <Space direction="vertical" style={{ width: "100%" }} className="mt-5">
      <Flex justify="space-between">
        <Title level={2}>Transaction</Title>
        <>
          {(mode == "form" || mode == "read-only-form") && (
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => {
                setMode("table");
              }}
            >
              {"View"}
            </Button>
          )}
          {mode == "table" && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setMode("form");
              }}
            >
              {"Add"}
            </Button>
          )}
        </>
      </Flex>
      {(mode == "form" || mode == "read-only-form") && <TransactionForm />}
      {mode == "table" && <TransactionTable />}
    </Space>
  );
};

export default Dashboard;
