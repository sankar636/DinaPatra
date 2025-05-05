import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const user = useSelector((state) => state.user.currentUser);

  // If user is logged in, show the nested route content
  if (user) {
    return <Outlet />;
  }

  // If not logged in, redirect to login page
  return <Navigate to="/login" />;
};

export default PrivateRoute;
