import React, { useState } from "react";
import { Button, Input, Card } from "antd";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        console.log("Registering with:", { username, email, password });
    };

    return (
        <Card title="Register" style={{ width: 300, margin: "auto", marginTop: 50 }}>
            <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ marginBottom: 10 }}
            />
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
            <Button type="primary" block onClick={handleRegister}>
                Register
            </Button>
        </Card>
    );
};

export default Register;
