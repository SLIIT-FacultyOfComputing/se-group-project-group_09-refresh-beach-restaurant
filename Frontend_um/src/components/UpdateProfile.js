import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogoutButton from './LogoutButton'; // Import LogoutButton component

const MyProfile = () => {
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

    // Displayed username & email (updates after Save)
    const [displayUsername, setDisplayUsername] = useState('');
    const [displayEmail, setDisplayEmail] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/users/${userId}`)
            .then(response => {
                const user = response.data;
                setUsername(user.username);
                setEmail(user.email);
                setPhone(user.phone);
                setAddress(user.address);

                // Set initial display values
                setDisplayUsername(user.username);
                setDisplayEmail(user.email);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [userId]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedUser = { username, email, phone, address, currentPassword, newPassword, confirmNewPassword };

        try {
            await axios.put(`http://localhost:8080/api/users/update/${userId}`, updatedUser);
            alert('Profile updated successfully!');

            // Update displayed values after saving
            setDisplayUsername(username);
            setDisplayEmail(email);
        } catch (error) {
            console.error('Error updating user data:', error);
            alert('Error updating profile');
        }
    };

    return (
        <div style={styles.container}>
            {/* Left Side - Profile Form */}
            <div style={styles.leftSide}>
                <h2>My Profile</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <label style={styles.label}>Change Name</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={styles.input} required />

                    <label style={styles.label}>Change Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />

                    <label style={styles.label}>Change Phone Number</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={styles.input} required />

                    <label style={styles.label}>Current Password</label>
                    <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} style={styles.input} required />

                    <label style={styles.label}>New Password</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={styles.input} required />

                    <label style={styles.label}>Confirm New Password</label>
                    <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} style={styles.input} required />

                    <button type="submit" style={styles.saveButton}>Save Changes</button>
                </form>
            </div>

            {/* Right Side - Profile Info & Actions */}
            <div style={styles.rightSide}>
                <div style={styles.profileSection}>
                    <img src="https://via.placeholder.com/150" alt="Profile" style={styles.profilePic} />
                    <p><strong>Username:</strong> {displayUsername}</p>
                    <p><strong>Email:</strong> {displayEmail}</p>
                </div>

                <button
                    style={styles.rightButton}
                    onClick={() => navigate(`/order-history/${userId}`)}
                >
                    Order History
                </button>
                <button style={styles.rightButton}>My Cart</button>
                <button
                    style={styles.rightButton}
                    onClick={() => navigate(`/edit-address/${userId}`)}
                >
                    Edit Address
                </button>

                <button style={styles.rightButton}>Payment Methods</button>

                {/* Replace with the LogoutButton */}
                <LogoutButton />
            </div>
        </div>
    );
};

// Inline Styles
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '800px',
        margin: 'auto',
        padding: '20px',
    },
    leftSide: {
        flex: 1,
        padding: '20px',
    },
    rightSide: {
        flex: 1,
        textAlign: 'center',
    },
    profileSection: {
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
        alignItems: 'center',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
        textAlign: 'right',
        width: '100%',
    },
    input: {
        width: '100%',
        padding: '8px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '5px',
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
    },
};

export default MyProfile;
