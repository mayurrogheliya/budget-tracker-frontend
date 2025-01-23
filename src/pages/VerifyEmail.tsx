import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { message, Spin } from "antd";
import { userAPI } from "../api/endpoints/user";

const VerifyEmail: React.FC = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const verifyEmail = async () => {
      if (!token) return;

      setLoading(true);
      try {
        const response = await userAPI.verifyEmail(token);
        if (isMounted) {
          message.success(
            response?.data?.message || "Email verified successfully!"
          );
          navigate("/login"); // Redirect to login page after successful verification
        }
      } catch (error: any) {
        if (isMounted) {
          message.error(
            error?.response?.data?.message || "Email verification failed"
          );
          navigate("/login"); // Redirect to login even in case of failure
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    verifyEmail();

    return () => {
      isMounted = false;
    };
  }, [token, navigate]);

  return (
    <div className="verification-container">
      {loading ? <Spin tip="Loading..." size="large" fullscreen /> : ""}
    </div>
  );
};

export default VerifyEmail;
