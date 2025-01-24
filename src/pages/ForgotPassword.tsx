import { MailOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Space,
  Typography,
} from "antd";
import React from "react";
import { useUserStore } from "../store/useUserStore";
import { userAPI } from "../api/endpoints/user";

const { Title } = Typography;

const ForgotPassword: React.FC = () => {
  const [form] = Form.useForm();
  const { loading, setLoading } = useUserStore();

  const handleForgotPassword = async (values: any) => {
    try {
      setLoading(true);
      const response = await userAPI.forgotPassword(values);
      form.resetFields();
      message.success(response?.data?.message || "Please check your email");
    } catch (error: any) {
      message.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Space className="bg-slate-200/10 w-full h-screen flex justify-center">
      <Card className=" m-2 shadow-sm max-w-md flex justify-center">
        <>
          <Space>
            <Form form={form} layout="vertical" onFinish={handleForgotPassword}>
              <Row gutter={16}>
                <Col xs={24} sm={24}>
                  <Title className="text-center font-mono">
                    Forgot Password
                  </Title>
                </Col>
                <Col xs={24} sm={24}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your email!",
                      },
                      {
                        type: "email",
                        message: "Please enter valid email address",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      prefix={
                        <MailOutlined
                          style={{
                            color: "#bfbfbf",
                          }}
                        />
                      }
                      placeholder="Enter your email"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} className="mt-4">
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      className="bg-sky-600 text-base !text-gray-50 hover:!bg-sky-600 w-full p-5"
                      disabled={loading}
                    >
                      Reset Password
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Space>
        </>
      </Card>
    </Space>
  );
};

export default ForgotPassword;
