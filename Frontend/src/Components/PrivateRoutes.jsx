import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  // If user is logged in, show the nested route content
  // console.log("CurrentUser",currentUser);
  
  if (currentUser) {
    return <Outlet />;
  }

  // If not logged in, redirect to login page
  return <Navigate to="/login" />;
};

export default PrivateRoute;


