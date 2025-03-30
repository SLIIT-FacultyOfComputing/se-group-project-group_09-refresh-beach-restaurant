import React, { useState } from "react";

const ConfirmReservationButton = ({ tableId, selectedDate, selectedTime }) => {
    const [isReserving, setIsReserving] = useState(false);
    const [reservationStatus, setReservationStatus] = useState(null);

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
            tableId: tableId,
            date: formattedDate,
            time: selectedTime,
            // Since we removed login, we'll hardcode guest information
            guestName: "Guest User",
            guestEmail: "guest@example.com",
            guestPhone: "555-555-5555",
            numberOfGuests: 2
        };

        setIsReserving(true);
        setReservationStatus("Reserving your table...");

        try {
            // For testing without a backend, we'll simulate a successful response
            const useTestMode = true; // Set to false when your backend is ready

            if (useTestMode) {
                // Simulate a network delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                setReservationStatus("Table reserved successfully!");
                alert("Table reserved successfully!");
            } else {
                // Real backend call
                const response = await fetch("http://localhost:8081/api/reservations/reserve", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(reservationData)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                setReservationStatus(result.message || "Table reserved successfully!");
                alert(result.message || "Table reserved successfully!");
            }
        } catch (error) {
            console.error("Error:", error);
            setReservationStatus("Failed to reserve table. Please try again.");
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

