import {
  Button,
  Card,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Spin,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useTransactionStore } from "../store/useTransactionStore";
import { transactionAPI } from "../api/endpoints/transaction";

const TransactionForm: React.FC = () => {
  const TransactionType: string[] = ["Income", "Expense"];

  const [form] = Form.useForm();
  const {
    loading,
    editingTransactions,
    setMode,
    setLoading,
    setEditingTransactions,
  } = useTransactionStore();

  useEffect(() => {
    if (editingTransactions) {
      const formattedTransaction = {
        ...editingTransactions,
        date: editingTransactions.date
          ? dayjs(editingTransactions.date, "DD/MM/YYYY")
          : null,
      };
      form.setFieldsValue(formattedTransaction);
    }
  }, [editingTransactions, form]);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const formattedValues = {
        ...values,
        _id: editingTransactions?._id,
        date: values.date ? dayjs(values.date).format("DD/MM/YYYY") : null,
      };
      if (editingTransactions) {
        await transactionAPI.update(formattedValues._id, formattedValues);
        message.success("Transactions updated successfully");
        setMode("table");
      } else {
        await transactionAPI.create(formattedValues);
        message.success("Transaction created successfully");
        setMode("table");
      }
      setEditingTransactions(null);
    } catch (error: any) {
      message.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <>
        {loading ? (
          <Spin tip="Loading..." size="large" fullscreen />
        ) : (
          <>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Row gutter={16} className="grid-cols-1">
                <Col xs={24} sm={12} md={8}>
                  <Form.Item name="type" label="Transaction Type">
                    <Select showSearch placeholder="Select transaction type">
                      {TransactionType.map((type, index) => (
                        <Select.Option value={type} key={index}>
                          {type}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    name="amount"
                    label="Amount"
                    rules={[
                      {
                        validator: (_, value) => {
                          if (value < 0) {
                            return Promise.reject(
                              new Error("Please enter valid amount!")
                            );
                          } else {
                            return Promise.resolve();
                          }
                        },
                      },
                    ]}
                  >
                    <Input type="number" placeholder="Enter Amount" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item name="date" label="Date" initialValue={dayjs()}>
                    <DatePicker
                      style={{ width: "100%" }}
                      format="DD/MM/YYYY"
                      disabledDate={(current) =>
                        current && current > dayjs().endOf("day")
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span="24">
                  <Form.Item name="description" label="Description">
                    <TextArea
                      rows={3}
                      placeholder="Enter transaction description"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Flex>
                <Space>
                  <Form.Item>
                    <Button
                      className="bg-sky-600 !text-gray-50 hover:!bg-sky-600"
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      className="bg-sky-600 !text-gray-50 hover:!bg-sky-600"
                      onClick={() => form.resetFields()}
                    >
                      Reset
                    </Button>
                  </Form.Item>
                </Space>
              </Flex>
            </Form>
          </>
        )}
      </>
    </Card>
  );
};

export default TransactionForm;
