import React, { useState, useEffect } from "react";
import { Button, Input, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const isVerified = localStorage.getItem("isVerified");
        const userEmail = localStorage.getItem("email");

        if (!isVerified || !userEmail) {
            message.error("Unauthorized access! Redirecting to login...");
            navigate("/login");
            return;
        }

        setLoading(false);
    }, [navigate]);

    const handleSubmit = async () => {
        if (newPassword !== confirmPassword) {
            message.error("Passwords do not match!");
            return;
        }

        setLoading(true);

        const email = localStorage.getItem("email");

        try {
            const response = await axios.post("http://localhost:8000/api/auth/changePassword", {
                email,
                newPassword,
                confirmPassword,
            });

            message.success(response.data.message);
            localStorage.clear();
            navigate("/login");
        } catch (error) {
            message.error(error.response?.data?.message || "Error changing password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Change Password" style={{ width: 300, margin: "auto", marginTop: 50 }}>
            <Input.Password
                placeholder="Enter new password"
                style={{ marginBottom: 10 }}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input.Password
                placeholder="Confirm password"
                style={{ marginBottom: 10 }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
                style={{ backgroundColor: '#1ABC9C' }}
                type="primary"
                block
                onClick={handleSubmit}
                loading={loading}
            >
                Change Password
            </Button>
        </Card>
    );
};

export default ChangePassword;
