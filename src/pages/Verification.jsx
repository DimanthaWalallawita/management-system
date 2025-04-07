import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const Verification = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [verified, setVerified] = useState(false);

    const token = searchParams.get("token");
    const email = searchParams.get("email");

    useEffect(() => {
        if (!token || !email) {
            navigate("/login");
            return;
        }

        axios.post("http://localhost:8000/api/auth/checkToken", { email, token })
            .then((response) => {
                const data = response.data;
                if (data.success) {
                    navigate(`/verificationOtp?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`);
                } else {
                    navigate("/register");
                }
            })
            .catch((error) => {
                console.error("Error verifying token:", error);
                navigate("/notfound");
            })
            .finally(() => setLoading(false));

    }, [token, email, navigate]);

    if (loading) return null;  // Show nothing while loading

    return (
        <h1>hello</h1>
    );
};

export default Verification;
