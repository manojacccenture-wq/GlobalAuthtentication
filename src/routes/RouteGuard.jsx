import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const RouteGuard = ({
  children,
  requireAuth = false,
  requirePublic = false,
  requireMfa = false,
  requireResetState = false,
  allowedRoles = [],
}) => {
  const { user, isAuthenticated, mfaPending } = useAuth();
  const location = useLocation();

  // 1️⃣ Public route (like login)
  if (requirePublic && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // 2️⃣ Protected route
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // 3️⃣ MFA route
  if (requireMfa) {
    if (!user) return <Navigate to="/" replace />;
    if (!mfaPending) return <Navigate to="/dashboard" replace />;
  }

  // 4️⃣ Role-based protection
  if (allowedRoles.length > 0) {
    if (!allowedRoles.includes(user?.role)) {
      return <Navigate to="/access-denied" replace />;
    }
  }

  // 5️⃣ Reset password route protection
  if (requireResetState && !location.state?.username) {
    return <Navigate to="/forgotPassword" replace />;
  }

  return children;
};

export default RouteGuard;
