import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignUp from './components/signup';
import Login from './components/Login';
import LogoutButton from './components/LogoutButton';
import UpdateProfile from './components/UpdateProfile'; // Import UpdateProfile Component
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword'; // Import ForgotPassword Component

function App() {
    return (
        <Router>
            <div>
                <nav style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
                    {/* Links for navigation */}
                    <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
                    <Link to="/signup" style={{ marginRight: '10px' }}>Sign Up</Link>
                    <Link to="/profile/1" style={{ marginRight: '10px' }}>User Profile</Link>
                </nav>

                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    {/* Updated route with userId */}
                    <Route path="/profile/:userId" element={<UpdateProfile />} />
                    <Route path="/update-profile" element={<UpdateProfile />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
