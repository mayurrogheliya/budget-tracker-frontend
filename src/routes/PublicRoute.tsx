import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const PublicRoute: React.FC = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
