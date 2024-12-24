import {
  Button,
  Card,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import dayjs from "dayjs";
import React from "react";

const TransactionForm: React.FC = () => {
  const TransactionType: string[] = ["Income", "Expense"];

  const [form] = Form.useForm();
  return (
    <Card className="shadow-md">
      <>
        <Form
          form={form}
          layout="vertical"
          onFinish={(value) => {
            console.log(value);
          }}
        >
          <Row gutter={16} className="grid-cols-1">
            <Col xs={24} sm={12} md={8}>
              <Form.Item name="type" label="Transaction Type">
                <Select showSearch placeholder="Select transaction type">
                  {TransactionType.map((type, index) => (
                    <Option value={type} key={index}>
                      {type}
                    </Option>
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
                  disabledDate={(current) => {
                    return current && current > dayjs().endOf("day");
                  }}
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
                <Button type="primary" onClick={() => form.resetFields()}>
                  Reset
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Space>
          </Flex>
        </Form>
      </>
    </Card>
  );
};

export default TransactionForm;
