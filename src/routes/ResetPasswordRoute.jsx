import { Navigate, useLocation } from "react-router-dom";

const ResetPasswordRoute = ({ children }) => {
  const location = useLocation();

  // If no state (user didn't come from forgot page)
  if (!location.state?.username) {
    return <Navigate to="/forgotPassword" replace />;
  }

  return children;
};

export default ResetPasswordRoute;
