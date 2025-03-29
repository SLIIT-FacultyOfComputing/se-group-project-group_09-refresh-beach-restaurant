import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.jpeg'; // Import the JPEG logo
import { Link } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Simulate an API call to check login credentials
        const mockUserData = { email: 'admin@example.com', password: 'admin', role: 'admin' }; // Replace with actual login API call
        const mockUser = { email, password };

        if (mockUser.email === mockUserData.email && mockUser.password === mockUserData.password) {
            // Simulating role-based redirection
            if (mockUserData.role === 'admin') {
                navigate('/admin-dashboard'); // Redirect to Admin Dashboard
            } else {
                navigate('/user-dashboard'); // Redirect to User Dashboard
            }
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            {/* Display the logo */}
            <img src={logo} alt="Restaurant Logo" style={{ width: '200px', marginBottom: '20px' }} />
            <h2>Login to Refresh Restaurant</h2>

            {/* Login Form */}
            <form onSubmit={handleLogin}>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ padding: '10px', marginBottom: '10px', width: '40%' }}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        color: 'white'
                    }}
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
