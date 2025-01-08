import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
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
import { useNavigate } from "react-router-dom";
import { userAPI } from "../api/endpoints/user";
import { useUserStore } from "../store/useUserStore";

const { Title } = Typography;

const RegisterForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { setLoading, loading } = useUserStore();
  const handelRegister = async (values: any) => {
    try {
      setLoading(true);
      const response = await userAPI.create(values);
      message.success(response?.data?.message || "Register Success");
      navigate("/login");
    } catch (error: any) {
      message.error(error?.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Space className="bg-slate-200/10 w-full h-screen flex justify-center">
      <Card className=" m-2 shadow-sm max-w-md flex justify-center">
        <>
          <Space>
            <Form form={form} layout="vertical" onFinish={handelRegister}>
              <Row gutter={16}>
                <Col xs={24} sm={24}>
                  <Title className="text-center font-mono">Register</Title>
                </Col>
                <Col xs={24} sm={24}>
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your name!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      prefix={
                        <UserOutlined
                          style={{
                            color: "#bfbfbf",
                          }}
                        />
                      }
                      placeholder="Enter your name"
                    />
                  </Form.Item>
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
                <Col xs={24} sm={24}>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      prefix={
                        <LockOutlined
                          style={{
                            color: "#bfbfbf",
                          }}
                        />
                      }
                      placeholder="Enter your password"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} className="mt-4">
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      className="bg-sky-600 text-base ${} !text-gray-50 hover:!bg-sky-600 w-full p-5"
                      disabled={loading}
                    >
                      {loading ? "Register..." : "Register"}
                    </Button>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} className="text-center">
                  <span>Already have an account? </span>
                  <Button
                    type="link"
                    className="p-0 underline"
                    onClick={() => navigate("/login")}
                  >
                    Login here
                  </Button>
                </Col>
              </Row>
            </Form>
          </Space>
        </>
      </Card>
    </Space>
  );
};

export default RegisterForm;
