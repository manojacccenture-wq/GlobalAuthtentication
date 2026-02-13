import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './pages/SignIn/SignIn';
import MFA from './pages/MFA/MFA';
import SignUp from './pages/signup/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';

const App = () => {
  return (
    <div>

      <Routes>

        <Route path="/" element={<SignIn />} />
        <Route path="/mfa" element={<MFA />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/dashBoard" element={<Dashboard />} />

      </Routes>

    </div>
  )
}

export default App
