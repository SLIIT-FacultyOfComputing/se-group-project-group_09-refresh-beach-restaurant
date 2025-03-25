import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Reservations from "./pages/Reservations";
import ReserveTable from "./pages/ReserveTable";
import Login from "./pages/Login";
import { checkAuth } from "./services/api";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        // Verify with server
        const verifyAuth = async () => {
            try {
                const response = await checkAuth();
                if (response.userId) {
                    // Update user if server has different info
                    setUser({
                        userId: response.userId,
                        username: response.username,
                        fullName: response.fullName
                    });
                    localStorage.setItem('user', JSON.stringify({
                        userId: response.userId,
                        username: response.username,
                        fullName: response.fullName
                    }));
                } else {
                    // Clear localStorage if server says not authenticated
                    localStorage.removeItem('user');
                    setUser(null);
                }
            } catch (error) {
                console.error("Auth verification error:", error);
                // Keep the stored user on network errors
            } finally {
                setLoading(false);
            }
        };

        verifyAuth();
    }, []);

    if (loading) {
        return <div className="flex h-screen justify-center items-center">Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                <Route path="/" element={user ? <Reservations /> : <Navigate to="/login" />} />
                <Route path="/reserve" element={user ? <ReserveTable user={user} /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;



