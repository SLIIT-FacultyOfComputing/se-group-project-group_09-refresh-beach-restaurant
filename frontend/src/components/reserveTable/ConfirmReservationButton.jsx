import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createReservation } from "../../services/api";

const ConfirmReservationButton = ({ tableId, selectedDate, selectedTime }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleConfirm = async () => {
        if (!tableId || !selectedDate || !selectedTime) {
            setError("Please select a table, date, and time!");
            return;
        }

        try {
            setLoading(true);
            // Get user info from localStorage
            const userStr = localStorage.getItem('user');
            if (!userStr) {
                setError("You must be logged in to make a reservation");
                navigate('/login');
                return;
            }
            
            const user = JSON.parse(userStr);
            
            const response = await createReservation(
                user.userId,
                tableId,
                selectedDate,
                selectedTime
            );
            
            if (response.message && response.message.includes("successfully")) {
                alert("Reservation confirmed! You can view your reservations in 'My Reservations'.");
                navigate('/');
            } else {
                setError(response.message || "Failed to reserve table");
            }
        } catch (err) {
            console.error("Error:", err);
            setError("Failed to reserve table. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <button
                className={`mt-4 px-6 py-3 ${loading ? 'bg-gray-500' : 'bg-yellow-500 hover:bg-yellow-600'} text-white font-bold rounded-lg`}
                onClick={handleConfirm}
                disabled={loading}
            >
                {loading ? "Processing..." : `Confirm Reservation`}
            </button>
        </div>
    );
};

export default ConfirmReservationButton;

