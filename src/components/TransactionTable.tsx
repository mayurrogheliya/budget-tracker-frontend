import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Input, message, Space, Table, Tooltip } from "antd";
import React, { useCallback, useEffect } from "react";
import { useTransactionStore } from "../store/useTransactionStore";
import { transactionAPI } from "../api/endpoints/transaction";
import { ColumnsType } from "antd/es/table";

interface Transaction {
  _id: string;
  type: string;
  amount: number;
  description: string;
  date: string;
}

const TransactionTable: React.FC = () => {
  const {
    transactions,
    fetchTransactions,
    setEditingTransactions,
    setMode,
    searchText,
    setSearchText,
  } = useTransactionStore();

  const handleSearch = useCallback(
    (e: any) => {
      setSearchText(e.target.value);
      fetchTransactions(e.target.value);
    },
    [fetchTransactions, setSearchText]
  );

  useEffect(() => {
    fetchTransactions(searchText);
  }, [fetchTransactions, searchText]);

  const highlightText = (text: string, highlight: string) => {
    if (!text || !highlight) return text;
    const regex = text.toString().split(new RegExp(`(${highlight})`, "gi"));
    return regex.map((match, i) =>
      match.toLowerCase() === highlight.toLowerCase() ? (
        <span key={i} style={{ backgroundColor: "yellow" }}>
          {match}
        </span>
      ) : (
        match
      )
    );
  };

  const deleteTransaction = async (id: string) => {
    try {
      await transactionAPI.delete(id);
      message.success("Transaction deleted successfully");
      fetchTransactions(searchText);
    } catch (error: any) {
      message.error(error?.response?.data?.message);
    }
  };

  const typeFilter = [...new Set(transactions.map((item) => item.type))].map(
    (type) => ({ text: type, value: type })
  );
  const columns: ColumnsType<Transaction> = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      filters: typeFilter,
      onFilter: (value, record) => String(record.type) === String(value),
      filterSearch: true,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string) => highlightText(text, searchText),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Transaction) => (
        <Space size={0}>
          <Tooltip title="Edit Transaction">
            <Button
              type="text"
              icon={<EditOutlined />}
              style={{ color: "#2ecc71" }}
              onClick={() => {
                setEditingTransactions(record);
                setMode("form");
              }}
            />
          </Tooltip>
          <Tooltip title="Delete Transaction">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              style={{ color: "#e74c3c" }}
              onClick={() => {
                deleteTransaction(record._id);
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card bordered={true}>
        <Input
          placeholder="Search..."
          style={{ marginBottom: 16 }}
          onChange={handleSearch}
          value={searchText}
        />
        <Table
          style={{ overflowX: "auto" }}
          columns={columns}
          dataSource={transactions}
          rowKey="_id"
          bordered={true}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} transactions`,
            pageSizeOptions: ["5", "10", "20"],
          }}
        />
      </Card>
    </>
  );
};

export default TransactionTable;
