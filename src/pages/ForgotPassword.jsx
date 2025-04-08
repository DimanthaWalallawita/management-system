import React, { useState } from 'react';
import { Button, Input, Card, message } from "antd";
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async () => {
        if (!email) {
            message.error("Please enter a valid email address");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/auth/forget-password", { email });
            message.success(response.data.message);
        } catch (error) {
            message.error(error.response?.data?.message || "Please check your email & try again.");
        }
    };

    return (
        <Card title="Forgot Password" style={{ width: 300, margin: "auto", marginTop: 50 }}>
            <Input
                placeholder="Enter Email Address"
                style={{ marginBottom: 10 }}
                value={email}
                onChange={handleEmailChange}
            />
            <Button
                style={{ backgroundColor: '#1ABC9C' }}
                type="primary"
                block
                onClick={handleSubmit}
            >
                Verify
            </Button>
        </Card>
    );
};

export default ForgotPassword;
