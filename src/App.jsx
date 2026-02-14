import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import RouteGuard from "./routes/RouteGuard";
import Loader from "./components/Common/Loader/Loader";

//  Lazy Loaded Pages
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const SignUp = lazy(() => import("./pages/signup/SignUp"));
const MFA = lazy(() => import("./pages/MFA/MFA"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const ForgotPassword = lazy(() => import("./pages/ForogotPassword/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword/ResetPassword"));
const AccessDenied = lazy(() => import("./pages/AccessDenied/AccessDenied"));

const App = () => {
  return (
    <AuthProvider>
      <Suspense
        fallback={<Loader size="lg" variant="primary" text="Loading ..." />}
      >
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<RouteGuard requirePublic><SignIn /></RouteGuard>} />

          <Route path="/signup" element={<RouteGuard requirePublic> <SignUp /></RouteGuard>} />

          <Route path="/forgotPassword" element={<RouteGuard requirePublic><ForgotPassword /></RouteGuard>} />

          {/* MFA Route */}
          <Route path="/mfa" element={<RouteGuard requireMfa><MFA /></RouteGuard>} />

          {/* Protected Route */}
          <Route path="/dashboard" element={<RouteGuard  allowedRoles={["superadmin", "admin", "user", "supervisor"]}><Dashboard /></RouteGuard>} />

          {/* Reset Password Protected by State */}
          <Route path="/reset-password" element={<RouteGuard requireResetState><ResetPassword /></RouteGuard>} />

          {/* Access Denied */}
          <Route path="/access-denied" element={<AccessDenied />} />

        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default App;
