import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import Dashboard from "../pages/Dashboard";
import Analytics from "../pages/Analytics";
import LoginForm from "../pages/LoginForm";
import RootLayout from "../layout/RootLayout";
import ProtectedRoute from "./ProtectedRoute";
import RegisterForm from "../pages/RegisterForm";
import VerifyEmail from "../pages/VerifyEmail";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="login" element={<LoginForm />} />
      <Route path="register" element={<RegisterForm />} />
      <Route path="verify-email/:token" element={<VerifyEmail />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password/:token" element={<ResetPassword />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
      </Route>
    </Route>
  )
);

const AppRouters: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouters;
