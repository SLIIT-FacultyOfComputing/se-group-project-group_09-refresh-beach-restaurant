import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.jpeg'; // Import the JPEG logo

const Login = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            {/* Display the logo */}
            <img
                src={logo}
                alt="Restaurant Logo"
                style={{ width: '200px', marginBottom: '20px' }} // Set the logo width
            />
            <h2>Login to Refresh Restaurant</h2>

            {/* Login Form */}
            <form>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        style={{ padding: '10px', marginBottom: '10px', width: '40%' }}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        style={{ padding: '10px', marginBottom: '10px', width: '40%' }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007BFF',
                        border: 'none',
                        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
                        color: 'white' }}
                >
                    Login
                </button>
            </form>

            <p style={{ marginTop: '20px' }}>
                Don't have an account? <Link to="/signup" style={{ color: '#007BFF' }}>Sign up here</Link>
            </p>

            {/* Forgot Password Link */}
            <p style={{ marginTop: '10px' }}>
                <Link to="/forgot-password" style={{ color: '#007BFF' }}>Forgot your password?</Link>
            </p>
        </div>
    );
};

export default Login;
