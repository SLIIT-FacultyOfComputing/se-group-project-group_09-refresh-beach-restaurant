import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/images/restaurant-bg.jpg';
 // Replace with the correct path to your image

function Home() {
    const [isAdmin, setIsAdmin] = useState(false);  // Assuming a check to determine if the user is an admin

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                textAlign: 'center',
                position: 'relative',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent background to make text readable
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                }}
            >
                <h1>Welcome to Our Restaurant!</h1>
                <p>Explore our menu, order food, and enjoy a great experience.</p>

                {/* If the user is an admin, allow them to choose a role */}
                {isAdmin ? (
                    <div>
                        <h3>Choose Role</h3>
                        <label>
                            <input type="radio" name="role" value="admin" /> Admin
                        </label>
                        <label>
                            <input type="radio" name="role" value="user" /> User
                        </label>
                        <Link to="/login">
                            <button
                                style={{
                                    padding: '10px 20px',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    marginTop: '20px',
                                    backgroundColor: '#007BFF',
                                    border: 'none',
                                    color: 'white',
                                    borderRadius: '5px',
                                }}
                            >
                                Login as Selected Role
                            </button>
                        </Link>
                    </div>
                ) : (
                    <Link to="/login">
                        <button
                            style={{
                                padding: '10px 20px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                marginTop: '20px',
                                backgroundColor: '#007BFF',
                                border: 'none',
                                color: 'white',
                                borderRadius: '5px',
                            }}
                        >
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Home;
