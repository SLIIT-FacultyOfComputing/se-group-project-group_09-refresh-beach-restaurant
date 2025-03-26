// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to Our Restaurant!</h1>
            <p>Explore our menu, order food, and enjoy a great experience.</p>
            <Link to="/login">
                <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                    Login
                </button>
            </Link>
        </div>
    );
}

export default Home;
