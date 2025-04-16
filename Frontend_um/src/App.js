import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignUp from './components/signup';
import Login from './components/Login';
import UpdateProfile from './components/UpdateProfile';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import AdminDashboard from './components/AdminDashboard';  // Admin Dashboard
import UserDashboard from './components/UserDashboard';    // User Dashboard
import LogoutButton from './components/LogoutButton';  // If LogoutButton component is used

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
                        {/* Render dashboard link */}
                        <Link to={userRole === 'admin' ? '/admin-dashboard' : '/user-dashboard'} style={{ marginRight: '10px' }}>
                            Dashboard
                        </Link>

                        {/* Conditionally render Profile link based on role */}
                        {userRole !== 'admin' && (
                            <Link to="/profile/1" style={{ marginRight: '10px' }}>
                                Profile
                            </Link>
                        )}
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

                {/* Place logout button outside the dashboards */}
                {isLoggedIn && (
                    <div style={{ padding: '10px', backgroundColor: '#f4f4f4' }}>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
        </Router>
    );
}

export default App;
