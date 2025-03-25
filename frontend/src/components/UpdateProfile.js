import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams

const UpdateProfile = () => {
    const { userId } = useParams(); // Get userId from URL parameters

    // State for form fields
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    useEffect(() => {
        // Fetch user details if the user ID is provided (for updating their details)
        axios.get(`http://localhost:8080/api/users/${userId}`)
            .then(response => {
                const user = response.data;
                setUsername(user.username);
                setEmail(user.email);
                setPhone(user.phone);
                setAddress(user.address);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [userId]); // Only run on initial load or when userId changes

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prepare updated user data
        const updatedUser = {
            username,
            email,
            phone,
            address,
            currentPassword,
            newPassword,
            confirmNewPassword
        };

        try {
            // Send PUT request to update user details
            const response = await axios.put(`http://localhost:8080/api/users/update/${userId}`, updatedUser);
            console.log('User updated successfully:', response.data);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating user data:', error);
            alert('Error updating profile');
        }
    };

    return (
        <div className="update-profile-container">
            <h2>Update Profile</h2>
            <div className="profile-container">
                {/* Left Side - Profile Section */}
                <div className="left-side">
                    <div className="profile-photo">
                        {/* Placeholder for profile photo */}
                        <img src="https://via.placeholder.com/150" alt="Profile" />
                    </div>
                    <div className="profile-info">
                        <p><strong>Username:</strong> {username}</p>
                        <p><strong>Email:</strong> {email}</p>
                    </div>
                    <div className="edit-profile">
                        <h3>Edit Profile</h3>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">Change Name</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email">Change Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="phone">Change Phone Number</label>
                                <input
                                    type="text"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="current-password">Current Password</label>
                                <input
                                    type="password"
                                    id="current-password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="new-password">New Password</label>
                                <input
                                    type="password"
                                    id="new-password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="confirm-new-password">Confirm New Password</label>
                                <input
                                    type="password"
                                    id="confirm-new-password"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <button type="submit">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Side - Placeholder for further details */}
                <div className="right-side">
                    <p>Content for the right side will go here later.</p>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
