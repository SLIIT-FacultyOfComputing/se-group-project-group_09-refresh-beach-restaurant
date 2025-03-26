import React, { useState } from 'react';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password === formData.confirmPassword) {
            // Submit the form data (Here you can connect it with your backend later)
            alert('Sign up successful');
        } else {
            alert('Passwords do not match');
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Create an Account</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="Name"
                        name="Name"
                        value={formData.Name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                        style={{padding: '10px', marginBottom: '10px', width: '40%'}}
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
                        style={{padding: '10px', marginBottom: '10px', width: '40%'}}
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
                        style={{padding: '10px', marginBottom: '10px', width: '40%'}}
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
                        style={{padding: '10px', marginBottom: '10px', width: '40%'}}
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
