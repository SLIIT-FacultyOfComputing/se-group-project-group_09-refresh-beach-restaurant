import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import NotificationPreferences from './NotificationPreferences';

const UpdateProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    // State for form fields
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [notificationPreferences, setNotificationPreferences] = useState({
        orderUpdates: true,
        promotions: true,
        reservationReminders: true,
        menuUpdates: false,
        specialEvents: true
    });

    // Displayed username & email
    const [displayUsername, setDisplayUsername] = useState('');
    const [displayEmail, setDisplayEmail] = useState('');

    // Status message
    const [statusMessage, setStatusMessage] = useState(null);
    const [statusType, setStatusType] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/users/${userId}`)
            .then(response => {
                const user = response.data;
                setUsername(user.username);
                setEmail(user.email);
                setPhone(user.phone || '');
                setAddress(user.address || '');

                setDisplayUsername(user.username);
                setDisplayEmail(user.email);

                // If the user has notification preferences set, use them
                if (user.notificationPreferences) {
                    setNotificationPreferences(user.notificationPreferences);
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                showStatus('Error fetching user data', 'error');
            });
    }, [userId]);

    const showStatus = (message, type) => {
        setStatusMessage(message);
        setStatusType(type);

        // Clear message after 5 seconds
        setTimeout(() => {
            setStatusMessage(null);
        }, 5000);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmNewPassword) {
            showStatus('New passwords do not match!', 'error');
            return;
        }

        const updatedUser = {
            username,
            email,
            phone,
            address,
            currentPassword,
            newPassword,
            notificationPreferences
        };

        try {
            await axios.put(`http://localhost:8080/api/users/update/${userId}`, updatedUser);
            showStatus('Profile updated successfully!', 'success');
            setDisplayUsername(username);
            setDisplayEmail(email);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (error) {
            console.error('Error updating user data:', error);
            showStatus('Error updating profile', 'error');
        }
    };

    // Handle notification preferences updates
    const updateNotificationPreferences = (preferences) => {
        setNotificationPreferences(preferences);
    };

    const statusStyle = {
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '15px',
        textAlign: 'center',
        backgroundColor: statusType === 'success' ? '#d4edda' : '#f8d7da',
        color: statusType === 'success' ? '#155724' : '#721c24',
    };

    return (
        <div style={styles.container}>
            <div style={styles.leftSide}>
                <h2>My Profile</h2>
                {statusMessage && <div style={statusStyle}>{statusMessage}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <label style={styles.label}>Change Name</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={styles.input} required />

                    <label style={styles.label}>Change Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />

                    <label style={styles.label}>Change Phone Number</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={styles.input} required />

                    <label style={styles.label}>Current Password</label>
                    <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} style={styles.input} />

                    <label style={styles.label}>New Password</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={styles.input} />

                    <label style={styles.label}>Confirm New Password</label>
                    <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} style={styles.input} />

                    <button type="submit" style={styles.saveButton}>Save Changes</button>
                </form>
            </div>

            <div style={styles.rightSide}>
                <div style={styles.profileSection}>
                    <img src="https://via.placeholder.com/150" alt="Profile" style={styles.profilePic}/>
                    <p><strong>Username:</strong> {displayUsername}</p>
                    <p><strong>Email:</strong> {displayEmail}</p>
                </div>

                <button style={styles.rightButton}>My Cart</button>
                <button style={styles.rightButton} onClick={() => navigate(`/order-history/${userId}`)}>Order History</button>
                <button style={styles.rightButton} onClick={() => navigate(`/edit-address/${userId}`)}>Edit Address</button>
                <button style={styles.rightButton} onClick={() => navigate(`/payment-methods/${userId}`)}>Payment Methods</button>

                {/* Added Notification Preferences under Payment Methods */}
                <div style={styles.notificationSection}>
                    <NotificationPreferences
                        preferences={notificationPreferences}
                        onUpdate={updateNotificationPreferences}
                    />
                </div>

                <LogoutButton/>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '1000px',
        margin: 'auto',
        padding: '20px',
    },
    leftSide: {
        flex: '1',
        padding: '20px',
        marginRight: '20px',
    },
    rightSide: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    profileSection: {
        marginBottom: '20px',
        textAlign: 'center',
    },
    notificationSection: {
        width: '100%',
        marginTop: '10px',
        marginBottom: '20px',
    },
    profilePic: {
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        marginBottom: '10px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
        textAlign: 'left',
        width: '100%',
    },
    input: {
        width: '100%',
        padding: '8px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f0f0f0',
    },
    saveButton: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '50%',
        fontSize: '16px',
        alignSelf: 'center',
    },
    rightButton: {
        width: '100%',
        padding: '12px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#FFFFFF',
        color: 'black',
        fontSize: '16px',
        cursor: 'pointer',
        transition: '0.3s',
        marginBottom: '10px',
        textAlign: 'center',
    },
};
export default UpdateProfile;