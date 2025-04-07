import React from 'react'
import "../App.scss";
import background from '../assets/background/background.mp4'
import { ArrowRightOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Home = () => {
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    const isLeftInView = useInView(leftRef, { once: true, margin: "-100px" });
    const isRightInView = useInView(rightRef, { once: true, margin: "-100px" });
    return (
        <>
            <div className='home-container'>
                <div className="video-container">
                    <video autoPlay loop muted className="background-video">
                        <source src={background} type="video/mp4" />
                    </video>

                    <motion.div
                        className="text-overlay"
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h1 style={{ color: '#fff', fontSize: '42px' }}>Task Management System</h1>
                        <h2 style={{ color: '#1ABC9C', fontSize: '24px' }}>Micro Frontend Architecture</h2>
                    </motion.div>
                </div>

                <div className='information'>
                    <div className='info-left'>
                        <h1 style={{ display: 'flex', flexDirection: 'column', lineHeight: '1px' }}>
                            <EllipsisOutlined style={{ fontSize: '48px', color: '#1ABC9C' }} />
                            Explore More
                        </h1>
                    </div>

                    <div className='info-right'>
                        <p>The Management System is a React.js web app with user authentication, a dashboard, and modular components.
                            It features a persistent footer, responsive UI, and optimized performance using Webpack and Module Federation.</p>
                        <Button
                            type="link"
                            size="small"
                            style={{ marginTop: '20px', padding: '0px', backgroundColor: '#1ABC9C', color: 'white', padding: '3px' }}
                        >
                            Get Started <ArrowRightOutlined />
                        </Button>
                    </div>
                </div>

                <div className="system-details">
                    <motion.div
                        ref={leftRef}
                        className="sys-details-left"
                        initial={{ x: -200, opacity: 0 }}
                        animate={isLeftInView ? { x: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1>Admin Functionalities</h1>
                        <h3 className='functions'>User Management</h3>
                        <h3 className='functions'>Verify Registrations</h3>
                        <h3 className='functions'>Reset Passwords</h3>
                        <h3 className='functions'>Manage Roles & Permissions</h3>
                        <h3 className='functions'>View All User Progress</h3>
                        <h3 className='functions'>System Configuration</h3>
                        <h3 className='functions'>Send System Notifications</h3>
                    </motion.div>

                    <motion.div
                        ref={rightRef}
                        className="sys-details-right"
                        initial={{ x: 200, opacity: 0 }}
                        animate={isRightInView ? { x: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1>User Functionalities</h1>
                        <h3 className='functions'>Register (OTP Verification)</h3>
                        <h3 className='functions'>Update Task Status</h3>
                        <h3 className='functions'>Reset Passwords</h3>
                        <h3 className='functions'>Fill Profile Details</h3>
                        <h3 className='functions'>Edit Profile</h3>
                        <h3 className='functions'>Receive Notifications</h3>
                        <h3 className='functions'>View & Get Assigned Task</h3>
                    </motion.div>
                </div>
            </div>
        </>
    )
}

export default Home
