import React, { useState } from "react";
import { Button, Input, Card, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            message.error("Please enter both email and password");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8000/api/auth/login", {
                email,
                password,
            });
            
            if (response.status === 200) {
                message.success("Login successful!");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("email", response.data.user.email);
                localStorage.setItem("isVerified", response.data.user.isVerified);
                navigate("/user");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Login" style={{ width: 300, margin: "auto", marginTop: 50 }}>
            <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginBottom: 10 }}
            />
            <Input.Password
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginBottom: 10 }}
            />
            <h5 style={{marginTop: '10px', marginBottom: '10px', cursor: 'pointer'}}>Forget Password?</h5>
            <Button style={{backgroundColor: '#1ABC9C'}} type="primary" block onClick={handleLogin} loading={loading}>
                Login
            </Button>
        </Card>
    );
};

export default Login;