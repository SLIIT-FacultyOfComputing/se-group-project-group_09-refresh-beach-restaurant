import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Update the paths to reflect the new folder structure
import SignUp from './pages/User_Management/signup';  // Fixed case to lowercase 'signup'
import Login from './pages/User_Management/Login';
import UpdateProfile from './pages/User_Management/UpdateProfile';
import Home from './pages/User_Management/Home';
import ForgotPassword from './pages/User_Management/ForgotPassword';
import AdminDashboard from './pages/User_Management/AdminDashboard';
import UserDashboard from './pages/User_Management/UserDashboard';
import LogoutButton from './pages/User_Management/LogoutButton';

// Update table reservation paths to reflect correct folder structure
import Reservations from './pages/Table_Reservation/Reservations';  // Corrected import
import ReserveTable from './pages/Table_Reservation/ReserveTable';  // Corrected import
import MyReservations from './pages/Table_Reservation/MyReservations';  // Corrected import

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null); // Track user role (admin or user)

    // This function is passed to Login component to handle login
    const handleLogin = (role) => {
        setIsLoggedIn(true);
        setUserRole(role);  // Set role after login (admin or user)
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserRole(null); // Clear role when logged out
    };

    return (
        <Router>
            <div>
                {/* Conditional Navigation Links */}
                {isLoggedIn && (
                    <nav style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
                        {/* Dashboard Link */}
                        <Link to={userRole === 'admin' ? '/admin-dashboard' : '/user-dashboard'} style={{ marginRight: '10px' }}>
                            Dashboard
                        </Link>

                        {/* Profile Link for non-admin users */}
                        {userRole !== 'admin' && (
                            <Link to="/profile/1" style={{ marginRight: '10px' }}>
                                Profile
                            </Link>
                        )}

                        {/* Table Reservation Links for all users */}
                        <Link to="/reserve" style={{ marginRight: '10px' }}>
                            Reserve Table
                        </Link>
                        <Link to="/my-reservations" style={{ marginRight: '10px' }}>
                            My Reservations
                        </Link>

                        {/* Logout Button */}
                        <button onClick={handleLogout}>Logout</button>
                    </nav>
                )}

                <Routes>
                    {/* Auth Routes */}
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />

                    {/* Dashboard Routes */}
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/user-dashboard" element={<UserDashboard />} />

                    {/* Profile Route */}
                    <Route path="/profile/:userId" element={<UpdateProfile />} />

                    {/* Table Reservation Routes */}
                    <Route path="/" element={<Reservations />} /> {/* Default Page */}
                    <Route path="/reserve" element={<ReserveTable />} />
                    <Route path="/my-reservations" element={<MyReservations />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
