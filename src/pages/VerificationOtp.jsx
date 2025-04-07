import { useSearchParams, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Button, Input, Card, message } from "antd";
import axios from "axios";

const VerificationOtp = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const [otp, setOtp] = useState("");

    const handleSubmit = async () => {
        console.log("Email:", email);
        console.log("Token:", token);
        console.log("OTP:", otp);

        if (!email || !token || !otp) {
            message.error("Missing required parameters. Please try again.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:8000/api/auth/verify-otp", {
                email,
                token,
                otp
            });

            if (response.data.success) {
                message.success("OTP Verified! Redirecting...");
                localStorage.setItem("isVerified", "true");
                localStorage.setItem("email", email);
                navigate("/success");
                // alert(response.data.error || "OTP verification failed");
            }
        } catch (error) {
            message.error("Error verifying OTP: " + (error.response?.data?.error || "Something went wrong"));
        }
    };

    return (
        // <div>
        //     <h1>Enter OTP</h1>
        //     <input
        //         type="text"
        //         placeholder="Enter OTP"
        //         value={otp}
        //         onChange={(e) => setOtp(e.target.value)}
        //         required
        //     />
        //     <button onClick={handleSubmit}>Submit</button>
        // </div>

        <Card title="OTP Verification" style={{ width: 300, margin: "auto", marginTop: 50 }}>
            <Input
                placeholder="Enter OTP Number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
            />

            <Button style={{backgroundColor: '#1ABC9C', marginTop: '15px'}} type="primary" block onClick={handleSubmit}>Submit</Button>
        </Card>
    );
}

export default VerificationOtp;
