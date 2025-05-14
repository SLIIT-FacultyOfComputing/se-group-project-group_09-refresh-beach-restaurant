import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: ''

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/signup', {
                email: formData.email,
                password: formData.password,
                role: 'user' // or 'admin' depending on how you define it
            });

            alert(response.data);
        } catch (error) {
            alert(error.response?.data || 'Signup failed');
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Create an Account</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        required
                        style={{ padding: '10px', marginBottom: '10px', width: '40%' }}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        required
                        style={{ padding: '10px', marginBottom: '10px', width: '40%' }}
                    />
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        style={{ padding: '10px', marginBottom: '10px', width: '40%' }}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        style={{ padding: '10px', marginBottom: '10px', width: '40%' }}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        required
                        style={{ padding: '10px', marginBottom: '10px', width: '40%' }}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        required
                        style={{ padding: '10px', marginBottom: '10px', width: '40%' }}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#007BFF',
                            color: 'white',
                            border: 'none',
                            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
                            cursor: 'pointer',
                            width: '10%',
                        }}
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
