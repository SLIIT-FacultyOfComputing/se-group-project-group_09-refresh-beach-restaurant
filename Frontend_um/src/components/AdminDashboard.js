import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '20px' }}>
            <h1>Welcome to Admin Dashboard</h1>

            <div style={styles.cardContainer}>
                <button style={styles.cardButton} onClick={() => navigate('/view-users')}>
                    View All Users
                </button>
                <button style={styles.cardButton} onClick={() => navigate('/add-user')}>
                    Add New User
                </button>
                <button style={styles.cardButton} onClick={() => navigate('/manage-users')}>
                    Update / Delete Users
                </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <LogoutButton />
            </div>
        </div>
    );
};

const styles = {
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        marginTop: '30px',
    },
    cardButton: {
        padding: '16px 32px',
        fontSize: '16px',
        backgroundColor: '#ffffff',
        border: '1px solid #ddd',
        borderRadius: '12px',
        width: '250px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        transition: 'all 0.3s',
    },
};

export default AdminDashboard;
