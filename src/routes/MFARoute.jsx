import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const MFARoute = ({ children }) => {
  const { user, mfaPending } = useAuth();

  // Not logged in → go back to login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Already verified → go to dashboard
  if (!mfaPending) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default MFARoute;
