import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError("Please enter a valid email address.");
            setMessage("");
            return;
        }
//change 
        try {
            const response = await axios.post("/api/auth/forgot-password", { email });

            if (response.status === 200) {
                setMessage(`Password reset instructions have been sent to ${email}`);
                setError("");
            }
        } catch (err) {
            setError("Something went wrong, please try again later.");
            setMessage("");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        style={{
                            padding: "10px",
                            marginBottom: "10px",
                            width: "40%",
                            textAlign: "center",
                        }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#007BFF",
                        border: "none",
                        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
                        color: "white",
                    }}
                >
                    Send Reset Link
                </button>
            </form>

            {message  && <p style={{ color: "green", marginTop: "20px" }}>{message}</p>}
            {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
        </div>
    );
}

export default ForgotPassword;





