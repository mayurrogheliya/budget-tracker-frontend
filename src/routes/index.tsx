import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import Dashboard from "../pages/Dashboard";
import Analytics from "../pages/Analytics";
import RootLayout from "../layout/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<RootLayout />}>
        <Route path="" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
      </Route>
    </Route>
  )
);

const AppRouters: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouters;
