import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
export const ProtectedAdminRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);

  if (user?.role !== "super-admin") {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
