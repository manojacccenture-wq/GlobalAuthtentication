import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { testUsers } from "../utils/constants/users";


const ForgotPasswordRoute = ({ children }) => {
  const location = useLocation();
  const username = location.state?.username;

  // If there's a username in state from SignIn, check access
  if (username) {
    const user = testUsers.find((u) => u.username === username);
    if (!user?.isForgotPassword) {
      return <Navigate to="/access-denied" replace />;
    }
  }

  return children;
};

export default ForgotPasswordRoute;
