import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { reservationApi } from "../../services/api";

const MyReservations = () => {
    const navigate = useNavigate();
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Hardcoded customer ID for demonstration
    // In a real app, this would come from authentication/context
    const customerId = 1;

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            setLoading(true);
            // Use API service instead of direct fetch
            const data = await reservationApi.getCustomerReservations(customerId);
            setReservations(data);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch reservations:", err);
            setError("Failed to load reservations. Please try again later.");
            // For demo purposes, if the API call fails, use mock data
            setReservations([
                { reservation_id: 1, reservation_date: "2023-07-20", reservation_time: "18:00:00", table_id: 1, status: "Upcoming" },
                { reservation_id: 2, reservation_date: "2023-07-25", reservation_time: "19:30:00", table_id: 4, status: "Upcoming" }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelReservation = async (id) => {
        if (!window.confirm("Are you sure you want to cancel this reservation?")) {
            return;
        }
        
        try {
            // Use API service instead of direct fetch
            await reservationApi.cancelReservation(id);
            
            // Remove the canceled reservation from the list
            setReservations(reservations.filter(res => res.reservation_id !== id));
            alert("Reservation canceled successfully!");
        } catch (err) {
            console.error("Failed to cancel reservation:", err);
            alert("Failed to cancel reservation. Please try again.");
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const formatTime = (timeString) => {
        if (!timeString) return "";
        return timeString.substring(0, 5); // Extract HH:MM from HH:MM:SS
    };

    return (
        <div className="relative w-full h-screen bg-cover bg-center" 
             style={{ backgroundImage: "url('/images/reservation.jpg')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center pt-16">
                <h1 className="text-4xl font-bold mb-8 text-white">My Reservations</h1>
                
                {loading ? (
                    <div className="text-white text-xl">Loading reservations...</div>
                ) : error ? (
                    <div className="text-red-500 text-xl">{error}</div>
                ) : reservations.length > 0 ? (
                    <div className="w-2/3 max-w-3xl">
                        {reservations.map(reservation => (
                            <div key={reservation.reservation_id} 
                                 className="bg-blue-800 mb-4 p-4 rounded shadow-md text-white">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold text-yellow-600">
                                            {formatDate(reservation.reservation_date)} at {formatTime(reservation.reservation_time)}
                                        </h3>
                                        <p>Table {reservation.table_id} · Status: {reservation.status}</p>
                                    </div>
                                    <div>
                                        <button 
                                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                                            onClick={() => handleCancelReservation(reservation.reservation_id)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-white text-xl">No reservations found</div>
                )}
                
                <button
                    onClick={() => navigate("/")}
                    className="mt-8 bg-blue-700 hover:bg-blue-800 text-yellow-600 font-bold text-lg py-3 px-8 rounded"
                >
                    Back to Home
                </button>
                
                <button
                    onClick={() => navigate("/reserve")}
                    className="mt-4 bg-green-700 hover:bg-green-800 text-white font-bold text-lg py-3 px-8 rounded"
                >
                    Make New Reservation
                </button>
            </div>
        </div>
    );
};

export default MyReservations;
