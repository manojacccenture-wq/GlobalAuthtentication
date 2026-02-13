import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/signup/SignUp";
import MFA from "./pages/MFA/MFA";
import Dashboard from "./pages/Dashboard/Dashboard";
import MFARoute from "./routes/MFARoute";

const App = () => {
  return (
    <AuthProvider>
      <Routes>

        <Route path="/" element={<PublicRoute> <SignIn /> </PublicRoute>} />

        <Route path="/signup" element={<PublicRoute> <SignUp /></PublicRoute>} />

        <Route path="/mfa" element={<MFARoute><MFA /></MFARoute>}/>


        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /></ProtectedRoute>} />

      </Routes>
    </AuthProvider>
  );
};

export default App;
