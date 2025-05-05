import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignUp from './components/signup';
import Login from './components/Login';
import UpdateProfile from './components/UpdateProfile';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import AdminDashboard from './components/AdminDashboard';
import ViewAllUsers from './components/ViewAllUsers';
import AddNewUser from './components/AddNewUser';
import UpdateDeleteUsers from './components/UpdateDeleteUsers';

import UserDashboard from './components/UserDashboard';
import OrderHistory from './components/orderHisory';
import EditAddress from './components/EditAddress';
import PaymentMethods from './components/PaymentMethods';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);

    const handleLogin = (role) => {
        setIsLoggedIn(true);
        setUserRole(role);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserRole(null);
    };

    return (
        <Router>
            <div>
                {isLoggedIn && (
                    <nav style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
                        <Link to={userRole === 'admin' ? '/admin-dashboard' : '/user-dashboard'} style={{ marginRight: '10px' }}>
                            Dashboard
                        </Link>

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
                    <Route path="/edit-address/:userId" element={<EditAddress />} />
                    <Route path="/view-users" element={<ViewAllUsers />} />
                    <Route path="/add-user" element={<AddNewUser />} />
                    <Route path="/manage-users" element={<UpdateDeleteUsers />} />
                    <Route path="/payment-methods/:userId" element={<PaymentMethods />} />
                    <Route path="/order-history/:userId" element={<OrderHistory />} /> {/*  New route */}
                </Routes>

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