import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";


import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/signup/SignUp";
import MFA from "./pages/MFA/MFA";
import Dashboard from "./pages/Dashboard/Dashboard";

import ForgotPassword from "./pages/ForogotPassword/ForgotPassword";

import ResetPassword from "./pages/ResetPassword/ResetPassword";
import AccessDenied from "./pages/AccessDenied/AccessDenied";

import RouteGuard from "./routes/RouteGuard";
import Loader from "./components/Common/Loader/Loader";

const App = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<Loader size="lg" variant="primary" />}>
        <Routes>

          <Route path="/" element={<RouteGuard requirePublic><SignIn /></RouteGuard>} />

          <Route path="/signup" element={<RouteGuard requirePublic><SignUp /></RouteGuard>} />

          <Route path="/mfa" element={<RouteGuard requireMfa><MFA /></RouteGuard>} />


          <Route path="/dashboard" element={<RouteGuard requireAuth allowedRoles={["superadmin", "admin", "user", "supervisor"]}><Dashboard /></RouteGuard>} />
          <Route path="/forgotPassword" element={<RouteGuard requirePublic><ForgotPassword /></RouteGuard>} />
          <Route path="/reset-password" element={<RouteGuard requireResetState><ResetPassword /></RouteGuard>} />
          <Route path="/access-denied" element={<AccessDenied />} />

        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default App;
