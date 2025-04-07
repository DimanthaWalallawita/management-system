// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'

// const Success = () => {
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(true);
//     const [userData, setUserData] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         mobileNumber: "",
//         address: "",
//         password: "",
//         confirmPassword: "",
//     });

//     useEffect(() => {
//         const isVerified = localStorage.getItem("isVerified");
//         const userEmail = localStorage.getItem("email");

//         if (!isVerified || !userEmail) {
//             alert("Unauthorized access! Redirecting to login...");
//             navigate("/login");
//             return;
//         }

//         setUserData(prevState => ({ ...prevState, email: userEmail }));
//         setLoading(false);
//     }, [navigate]);

//     const handleChange = (e) => {
//         setUserData({ ...userData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (userData.password !== userData.confirmPassword) {
//             alert("Passwords do not match!");
//             return;
//         }

//         try {
//             const response = await axios.post("http://localhost:8000/api/auth/register", {
//                 firstName: userData.firstName,
//                 lastName: userData.lastName,
//                 email: userData.email,
//                 mobileNumber: userData.mobileNumber,
//                 address: userData.address,
//                 password: userData.password,
//                 role: "User",
//             });

//             if (response.status === 200) {
//                 alert("Registration successful!");
//                 localStorage.removeItem("isVerified");
//                 localStorage.removeItem("email");
//                 navigate("/login");
//             }
//         } catch (error) {
//             alert("Error registering user: " + (error.response?.data?.message || "Server Error"));
//         }
//     };

//     if (loading) {
//         return <h2>Loading...</h2>;
//     }

//     return (
//         <div>
//             <h1>User Registration</h1>
//             <p>Welcome! Please complete your profile.</p>

//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>First Name</label>
//                     <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} required />
//                 </div>

//                 <div>
//                     <label>Last Name</label>
//                     <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} required />
//                 </div>

//                 <div>
//                     <label>Email</label>
//                     <input type="email" name="email" value={userData.email} readOnly />
//                 </div>

//                 <div>
//                     <label>Mobile</label>
//                     <PhoneInput
//                         country={"us"}
//                         value={userData.mobileNumber}
//                         onChange={(value) => setUserData({ ...userData, mobileNumber: value })}
//                         inputProps={{
//                             name: "mobileNumber",
//                             required: true,
//                         }}
//                     />
//                 </div>

//                 <div>
//                     <label>Password</label>
//                     <input type="password" name="password" value={userData.password} onChange={handleChange} required />
//                 </div>

//                 <div>
//                     <label>Confirm Password</label>
//                     <input type="password" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} required />
//                 </div>

//                 <div>
//                     <label>Address</label>
//                     <input type="text" name="address" value={userData.address} onChange={handleChange} />
//                 </div>

//                 <button type="submit">Register</button>
//             </form>
//         </div>
//     );
// };

// export default Success;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Form, Input, Button, message } from "antd";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Success = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        address: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        const isVerified = localStorage.getItem("isVerified");
        const userEmail = localStorage.getItem("email");

        if (!isVerified || !userEmail) {
            message.error("Unauthorized access! Redirecting to login...");
            navigate("/login");
            return;
        }

        setUserData(prevState => ({ ...prevState, email: userEmail }));
        setLoading(false);
    }, [navigate]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (values) => {
        if (values.password !== values.confirmPassword) {
            message.error("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/auth/register", {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                mobileNumber: values.mobileNumber,
                address: values.address,
                password: values.password,
                role: "User",
            });

            if (response.status === 200) {
                message.success("Registration successful!");
                localStorage.removeItem("isVerified");
                localStorage.removeItem("email");
                navigate("/login");
            }
        } catch (error) {
            message.error("Error registering user: " + (error.response?.data?.message || "Server Error"));
        }
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px" }}>
            <Card title="User Registration" bordered={false}>
                <p>Welcome! Please complete your profile.</p>

                <Form
                    name="registration-form"
                    initialValues={userData}
                    onFinish={handleSubmit}
                    layout="vertical"
                >
                    <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: "First name is required" }]}>
                        <Input name="firstName" value={userData.firstName} onChange={handleChange} />
                    </Form.Item>

                    <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: "Last name is required" }]}>
                        <Input name="lastName" value={userData.lastName} onChange={handleChange} />
                    </Form.Item>

                    <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Please input a valid email" }]}>
                        <Input name="email" value={userData.email} readOnly />
                    </Form.Item>

                    <Form.Item label="Mobile" name="mobileNumber" rules={[{ required: true, message: "Mobile number is required" }]}>
                        <PhoneInput
                            country={"us"}
                            value={userData.mobileNumber}
                            onChange={(value) => setUserData({ ...userData, mobileNumber: value })}
                            inputProps={{
                                name: "mobileNumber",
                                required: true,
                            }}
                        />
                    </Form.Item>

                    <Form.Item label="Password" name="password" rules={[{ required: true, message: "Password is required" }]}>
                        <Input.Password name="password" value={userData.password} onChange={handleChange} />
                    </Form.Item>

                    <Form.Item label="Confirm Password" name="confirmPassword" rules={[{ required: true, message: "Please confirm your password" }]}>
                        <Input.Password name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} />
                    </Form.Item>

                    <Form.Item label="Address" name="address">
                        <Input name="address" value={userData.address} onChange={handleChange} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block style={{backgroundColor: '#1ABC9C'}}>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Success;
