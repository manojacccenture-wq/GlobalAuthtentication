import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../shared/components/Loader/Loader";
import RouteGuard from "../shared/components/RouteGuard/RouteGuard";
import AuthLayout from "../shared/Layout/AuthLayout/AuthLayout";
import DashboardLayout from "../shared/Layout/DashboardLayout/DashboardLayout";

// Auth Pages
const SignIn = lazy(() => import("../features/auth/pages/SignIn"));
const SignUp = lazy(() => import("../features/auth/pages/SignUp"));
const ForgotPassword = lazy(() => import("../features/auth/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../features/auth/pages/ResetPassword"));
const MFA = lazy(() => import("../features/auth/pages/MFA"));

// Dashboard
const Dashboard = lazy(() => import("../features/dashboard/pages/Dashboard"));
const AccessDenied = lazy(() => import("../features/auth/pages/AccessDenied"));

const AppRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>

        {/* Public Auth Routes */}
        <Route element={<AuthLayout />}><Route path="/" element={
              <RouteGuard requirePublic>
                <SignIn />
              </RouteGuard>
            }
          />
          <Route
            path="/signup"
            element={
              <RouteGuard requirePublic>
                <SignUp />
              </RouteGuard>
            }
          />
          <Route
            path="/forgotPassword"
            element={
              <RouteGuard requirePublic>
                <ForgotPassword />
              </RouteGuard>
            }
          />
        </Route>

        {/* MFA */}
        <Route
          path="/mfa"
          element={
            <RouteGuard requireMfa>
              <MFA />
            </RouteGuard>
          }
        />

        {/* Protected Dashboard */}
        <Route
          element={
            <RouteGuard requireAuth>
              <DashboardLayout />
            </RouteGuard>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Reset Password */}
        <Route
          path="/reset-password"
          element={
            <RouteGuard requireResetState>
              <ResetPassword />
            </RouteGuard>
          }
        />

        <Route path="/access-denied" element={<AccessDenied />} />

      </Routes>
    </Suspense>
  );
};

export default AppRouter;
