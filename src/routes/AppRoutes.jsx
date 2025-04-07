import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login.jsx";
import Home from "../pages/Home.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Verification from "../pages/Verification.jsx";
import VerificationOtp from "../pages/VerificationOtp.jsx";
import Success from "../pages/Success.jsx";
import UserDashboard from "../pages/UserDashboard.jsx";
import AdminLogin from "../pages/AdminLogin.jsx";

const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/verification" element={<Verification/>}/>
                <Route path="/verificationOtp" element={<VerificationOtp/>} />
                <Route path="/success" element={<Success/>}/>
                <Route path="/user" element={<UserDashboard/>} />
                <Route path="/admin_login" element={<AdminLogin />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
