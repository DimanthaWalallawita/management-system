import React, { useState, useEffect } from "react";
import { Layout, Menu, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const adminToken = localStorage.getItem("adminToken");
        setIsLoggedIn(!!token || !!adminToken);
        setIsAdmin(!!adminToken);
    }, []);

    const handleProfileClick = () => {
        if (isAdmin) {
            navigate("/dashboard");
        } else {
            navigate("/user");
        }
    };

    return (
        <Header>
            <Menu className="header-container" mode="horizontal">
                <Menu.Item className="nav-links" key="home">
                    <Link className="link" to="/">Home</Link>
                </Menu.Item>

                {isLoggedIn ? (
                    <Menu.Item className="nav-links" key="profile">
                        <Button type="primary" className="link" onClick={handleProfileClick}>
                            Profile
                        </Button>
                    </Menu.Item>
                ) : (
                    <Menu.Item className="nav-links" key="login">
                        <Link className="link" to="/login">Login</Link>
                    </Menu.Item>
                )}
            </Menu>
        </Header>
    );
};

export default Navbar;
