import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Input, Space, Table, Tooltip } from "antd";
import React from "react";

const TransactionTable: React.FC = () => {
  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
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
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space size={0}>
          <Tooltip title="Edit Transaction">
            <Button
              type="text"
              icon={<EditOutlined />}
              style={{ color: "#2ecc71" }}
            />
          </Tooltip>
          <Tooltip title="Delete Transaction">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              style={{ color: "#e74c3c" }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const dataSource = [
    {
      id: "1",
      type: "Income",
      amount: "1000",
      description: "Salary",
      date: "01/01/2022",
    },
  ];

  return (
    <>
      <Card bordered={true}>
        <Input placeholder="Search..." style={{ marginBottom: 16 }} />
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          bordered={true}
          pagination={{
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
