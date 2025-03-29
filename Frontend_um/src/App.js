import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignUp from './components/signup';
import Login from './components/Login';
import LogoutButton from './components/LogoutButton';
import UpdateProfile from './components/UpdateProfile';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import AdminDashboard from './components/AdminDashboard';  // Admin Dashboard
import UserDashboard from './components/UserDashboard';    // User Dashboard

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);  // Track user role (admin or user)

    // This function is passed to Login component to handle login
    const handleLogin = (role) => {
        setIsLoggedIn(true);
        setUserRole(role);  // Set role after login (admin or user)
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserRole(null);  // Clear role when logged out
    };

    return (
        <Router>
            <div>
                {isLoggedIn && (
                    <nav style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
                        {/* Dynamically render the dashboard link based on userRole */}
                        <Link to={userRole === 'admin' ? '/admin-dashboard' : '/user-dashboard'} style={{ marginRight: '10px' }}>
                            Dashboard
                        </Link>
                        <Link to="/profile/1" style={{ marginRight: '10px' }}>Profile</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </nav>
                )}

                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/profile/:userId" element={<UpdateProfile />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/user-dashboard" element={<UserDashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
