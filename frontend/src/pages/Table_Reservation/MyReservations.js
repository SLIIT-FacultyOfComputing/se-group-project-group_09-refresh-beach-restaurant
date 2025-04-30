import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserReservations, cancelReservation } from "../../services/api";

const MyReservations = () => {
    const navigate = useNavigate();
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hardcoded user ID for now - will be replaced with actual user ID when authentication is implemented
    const userId = 1;

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                setLoading(true);
                const data = await getUserReservations(userId);
                console.log("Fetched reservations:", data);
                setReservations(data);
                setError(null);
            } catch (err) {
                console.error("Error fetching reservations:", err);
                setError("Failed to load reservations. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, [userId]);

    const handleCancelReservation = async (reservationId) => {
        if (window.confirm("Are you sure you want to cancel this reservation?")) {
            try {
                const response = await cancelReservation(reservationId);
                
                if (response.success) {
                    // Update the local state to reflect the canceled reservation
                    setReservations(prevReservations => 
                        prevReservations.filter(r => r.id !== reservationId)
                    );
                    alert("Reservation cancelled successfully");
                } else {
                    alert(response.message || "Failed to cancel reservation");
                }
            } catch (err) {
                console.error("Error cancelling reservation:", err);
                alert("Error cancelling reservation. Please try again.");
            }
        }
    };

    // Helper function to format time from 24-hour format to 12-hour format
    const formatTime = (timeString) => {
        if (!timeString) return "";
        
        // Parse the time string (expected format: HH:MM:SS)
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours, 10);
        
        // Determine AM/PM
        const ampm = hour >= 12 ? 'PM' : 'AM';
        
        // Convert 24-hour to 12-hour format
        const hour12 = hour % 12 || 12;
        
        // Return formatted time
        return `${hour12}:${minutes} ${ampm}`;
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
                            <div key={reservation.id} 
                                 className="bg-blue-800 mb-4 p-4 rounded shadow-md text-white">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold text-yellow-600">
                                            {reservation.reservationDate.toString()} at {formatTime(reservation.reservationTime)}
                                        </h3>
                                        <p>Table {reservation.tableId} · {reservation.peopleCount || 2} guests</p>
                                        <p className="mt-1">
                                            <span className={`
                                                px-2 py-1 rounded text-xs 
                                                ${reservation.status === 'CANCELED' ? 'bg-red-500' : 
                                                  reservation.status === 'UPCOMING' ? 'bg-green-600' : 'bg-gray-500'}
                                            `}>
                                                {reservation.status}
                                            </span>
                                        </p>
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
            </div>
        </div>
    );
};

export default MyReservations;
