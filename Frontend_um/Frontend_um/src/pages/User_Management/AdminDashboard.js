import React from 'react';
import LogoutButton from './LogoutButton';  // Import LogoutButton

const AdminDashboard = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Welcome to Admin Dashboard</h1>

            {/* Admin Action Buttons */}
            <div style={styles.actionButtons}>
                <button style={styles.button}>Manage Users</button>
                <button style={styles.button}>View Analytics</button>
                <button style={styles.button}>Perform Admin Actions</button>
            </div>

            {/* Spacer for better layout  */}
            <div style={{ flexGrow: 1 }}></div>  {/* Takes up remaining space */}

            {/* Logout Button placed at the bottom */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <LogoutButton />
            </div>
        </div>
    );
};
// Inline styles for the buttons and layout



const styles = {
    actionButtons: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',  // Space between buttons
        marginBottom: '20px',
    },
    button: {
        padding: '12px 24px',
        fontSize: '16px',
        color: 'black',
        backgroundColor: '#FFFFFF',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '100%',
        transition: '0.3s',
        textAlign: 'left',
    },
};

export default AdminDashboard;
