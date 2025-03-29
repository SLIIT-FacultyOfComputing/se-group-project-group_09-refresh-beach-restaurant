import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { reservationApi } from "../../../services/api";

const ConfirmReservationButton = ({ tableId, selectedDate, selectedTime }) => {
    const [isReserving, setIsReserving] = useState(false);
    const [reservationStatus, setReservationStatus] = useState(null);
    const navigate = useNavigate();

    const handleConfirm = async () => {
        if (!tableId || !selectedDate || !selectedTime) {
            alert("Please select a table, date, and time!");
            return;
        }

        // Format the date as YYYY-MM-DD
        const formattedDate = selectedDate instanceof Date 
            ? selectedDate.toISOString().split('T')[0] 
            : selectedDate;

        const reservationData = {
            table_id: tableId,
            reservation_date: formattedDate,
            reservation_time: selectedTime,
            customer_id: 1,
            status: "Upcoming"
        };

        setIsReserving(true);
        setReservationStatus("Reserving your table...");

        try {
            const result = await reservationApi.createReservation(reservationData);
            
            setReservationStatus("Table reserved successfully!");
            alert("Table reserved successfully!");
            
            setTimeout(() => {
                navigate("/my-reservations");
            }, 1500);
        } catch (error) {
            console.error("Error:", error);
            setReservationStatus(`Failed to reserve table: ${error.message}`);
            alert("Failed to reserve table. Please try again or contact the restaurant directly.");
        } finally {
            setIsReserving(false);
        }
    };

    return (
        <div className="text-center">
            <button
                className={`mt-4 px-6 py-3 ${isReserving ? 'bg-gray-500' : 'bg-yellow-500 hover:bg-yellow-600'} text-white font-bold rounded-lg`}
                onClick={handleConfirm}
                disabled={isReserving}
            >
                {isReserving ? "Processing..." : `Confirm Table ${tableId}`}
            </button>
            
            {reservationStatus && (
                <p className={`mt-2 ${reservationStatus.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
                    {reservationStatus}
                </p>
            )}
        </div>
    );
};

export default ConfirmReservationButton;

