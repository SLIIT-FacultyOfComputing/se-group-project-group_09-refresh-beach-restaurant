import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any stored authentication data, such as tokens
        localStorage.removeItem('token');  // Or sessionStorage depending on where you store it

        // Redirect to the login page
        navigate('/');
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
