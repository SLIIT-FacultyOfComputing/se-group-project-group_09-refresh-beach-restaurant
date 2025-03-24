import React from "react";

const ConfirmReservationButton = ({ tableId, selectedDate, selectedTime }) => {
    const handleConfirm = async () => {
        if (!tableId || !selectedDate || !selectedTime) {
            alert("Please select a table, date, and time!");
            return;
        }

        const reservationData = {
            tableId,
            date: selectedDate,
            time: selectedTime,
        };

        try {
            const response = await fetch("http://localhost:8081/api/reservations/reserve?" +
                new URLSearchParams(reservationData),
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });

            const result = await response.json();
            alert(result.message); // Show success or error message
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to reserve table");
        }
    };

    return (
        <button
            className="mt-4 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg"
            onClick={handleConfirm}
        >
            Confirm Table {tableId}
        </button>
    );
};

export default ConfirmReservationButton;

