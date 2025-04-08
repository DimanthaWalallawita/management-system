// AdminDashboard.js (Admin Dashboard Page)
import React, { Suspense, lazy, useEffect, useState } from "react";
import { message } from "antd";
import axios from "axios";

const AdminDashboardComponent = lazy(() => import("AdminDashboard/AdminDashboard"));

const Dashboard = () => {
    const [adminDetails, setAdminDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminDetails = async () => {
            const adminToken = localStorage.getItem("adminToken");
            console.log(adminToken);

            if (!adminToken) {
                message.error("Please log in first");
                localStorage.clear();
                window.location.href = '/admin_login';
            }

            try {
                const response = await axios.get("http://localhost:8000/api/user/admin/data", {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                });

                setAdminDetails(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                message.error(error.response?.data?.message || "Failed to fetch admin details.");
            }
        };

        fetchAdminDetails();
    }, []);

    if (loading) {
        return <div>Loading admin details...</div>;
    }

    if (!adminDetails) {
        localStorage.clear();
        window.location.href = '/admin_login';
        return <div>Admin not found or not authenticated.</div>;
    }

    return (
        <Suspense fallback={<div>Loading Admin Dashboard...</div>}>
            <section>
                <AdminDashboardComponent />
            </section>
        </Suspense>
    );
};

export default Dashboard;
