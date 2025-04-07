import React, { Suspense, lazy, useEffect, useState } from "react";
import { message } from "antd";
import axios from "axios";

const UserDashboardComponent = lazy(() => import("UserDashboard/UserDashboard"));

const UserDashboard = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    

    useEffect(()=> {
        const fetchUserDetails = async() => {
            const token = localStorage.getItem("token");

            if(!token){
                message.error("Please log in first");
                window.location.href = '/login';
            }

            try {
                const response = await axios.get("http://localhost:8000/api/user/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUserDetails(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                message.error(error.response?.data?.message || "Failed to fetch user details.");
            }
        }
        fetchUserDetails();
    }, []);

    if (loading) {
        return <div>Loading user details...</div>;
    }

    if (!userDetails) {
        window.location.href = '/login';
        return <div>User not found or not authenticated.</div>;
    }

    return (
        <Suspense fallback={<div>Loading User Dashboard...</div>}>
            <section>
                <UserDashboardComponent />
            </section>
        </Suspense>
    );
};

export default UserDashboard;
