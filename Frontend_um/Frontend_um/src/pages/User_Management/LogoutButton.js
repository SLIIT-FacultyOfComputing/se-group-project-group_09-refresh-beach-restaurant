import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any stored authentication data, such as tokens
        localStorage.removeItem('token');  // Or sessionStorage depending on where you store it

        // Redirect to the home page after logout
        navigate('/');
    };
    // Log when the LogoutButton is rendered
    console.log('Rendering LogoutButton');

    const styles = {
        logoutButton: {
            padding:'10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '50%',  // Set to 50% width
            fontSize: '16px',
        },
    };

    return (
        <button style={styles.logoutButton} onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
