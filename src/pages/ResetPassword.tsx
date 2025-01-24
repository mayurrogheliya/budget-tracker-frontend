import { LockOutlined } from "@ant-design/icons";
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
import { useNavigate, useParams } from "react-router-dom";

const { Title } = Typography;

const ResetPassword: React.FC = () => {
  const [form] = Form.useForm();
  const { loading, setLoading } = useUserStore();
  const { token } = useParams();
  const navigate = useNavigate();
  
  const handleResetPassword = async (values: any) => {
    const { password, confPassword } = values;

    if (password !== confPassword) {
      message.error("Passwords do not match!");
      return;
    }

    try {
      console.log(values);

      const response = await userAPI.resetPassword(token, values);
      message.success(
        response?.data?.message || "Password reset successfully!"
      );
      navigate("/login");
    } catch (error: any) {
      message.error(error?.response?.data?.message || "Password reset failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Space className="bg-slate-200/10 w-full h-screen flex justify-center">
      <Card className=" m-2 shadow-sm max-w-md flex justify-center">
        <>
          <Space>
            <Form form={form} layout="vertical" onFinish={handleResetPassword}>
              <Row gutter={16}>
                <Col xs={24} sm={24}>
                  <Title className="text-center font-mono">
                    Forgot Password
                  </Title>
                </Col>
                <Col xs={24} sm={24}>
                  <Form.Item
                    name="password"
                    label="New Password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter new password!",
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
                      placeholder="Enter new password"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24}>
                  <Form.Item
                    name="confPassword"
                    label="Confirm Password"
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
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
                      placeholder="Repeat your password"
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
                      {loading
                        ? "Change Password..."
                        : "Change Password"}
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

export default ResetPassword;
