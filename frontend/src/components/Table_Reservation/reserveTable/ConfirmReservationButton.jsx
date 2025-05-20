import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmReservationButton = ({ tableId, selectedDate, selectedTime, tableName }) => {
    const [isReserving, setIsReserving] = useState(false);
    const [reservationStatus, setReservationStatus] = useState(null);
    const [reservationSuccess, setReservationSuccess] = useState(false);
    const [email, setEmail] = useState("");
    const [showReservationForm, setShowReservationForm] = useState(false);
    const navigate = useNavigate();

    // Helper function to convert 12-hour time format to 24-hour format
    const convertTo24HourFormat = (timeString) => {
        if (!timeString) return null;
        
        // Check if the time is already in 24-hour format
        if (!timeString.includes(' ')) {
            // If it doesn't contain AM/PM, assume it's already in 24-hour format
            return timeString.includes(':') && timeString.split(':').length === 2 
                ? `${timeString}:00` 
                : timeString;
        }
        
        // Parse the time components
        const [time, modifier] = timeString.split(' ');
        let [hours, minutes] = time.split(':');
        
        // Convert hours to 24-hour format
        if (hours === '12') {
            hours = modifier === 'AM' ? '00' : '12';
        } else if (modifier === 'PM') {
            hours = String(parseInt(hours, 10) + 12);
        }
        
        // Ensure two digits
        hours = String(hours).padStart(2, '0');
        minutes = String(minutes).padStart(2, '0');
        
        // Return formatted time
        return `${hours}:${minutes}:00`;
    };

    const handleConfirm = async () => {
        if (!tableId || !selectedDate || !selectedTime) {
            alert("Please select a table, date, and time!");
            return;
        }

        if (!showReservationForm) {
            setShowReservationForm(true);
            return;
        }

        if (!email) {
            alert("Please enter your email for reservation reminders!");
            return;
        }

        // Format the date as YYYY-MM-DD
        const formattedDate = selectedDate instanceof Date 
            ? selectedDate.toISOString().split('T')[0] 
            : selectedDate;
            
        // Convert time to 24-hour format
        const formattedTime = convertTo24HourFormat(selectedTime);
        
        console.log("Time conversion:", selectedTime, "→", formattedTime);

        const reservationData = {
            tableId: tableId,
            customerId: 1, // For now, use a default customer ID
            reservationDate: formattedDate,
            reservationTime: formattedTime,
            peopleCount: 2, // Default number of people
            contactNumber: "555-555-5555", // Default contact number
            customerEmail: email
        };

        console.log("Sending reservation data:", reservationData);
        setIsReserving(true);
        setReservationStatus("Reserving your table...");

        try {
            // Set to false use the test mode
            const useTestMode = false; 

            if (useTestMode) {
                // Simulate a network delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                setReservationStatus("Table reserved successfully!");
                setReservationSuccess(true);
                alert("Table reserved successfully!");
            } else {
                // Real backend call with the correct port (8085)
                console.log("Sending reservation data to backend:", JSON.stringify(reservationData));
                try {
                    const backendUrl = "http://localhost:8085/api/reservations/reserve";
                    console.log("Sending request to:", backendUrl);
                    const response = await fetch(backendUrl, {
                        method: "POST",
                        credentials: "omit",
                        headers: { 
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify(reservationData)
                    });

                    console.log("Response status:", response.status);
                    
                    if (!response.ok) {
                        const errorText = await response.text();
                        console.error("Error response:", errorText);
                        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
                    }

                    const result = await response.json();
                    console.log("Response data:", result);

                    setReservationStatus(result.message || "Table reserved successfully!");
                    setReservationSuccess(true);
                    alert(result.message || "Table reserved successfully!");
                } catch (error) {
                    console.error("Fetch error details:", error);
                    throw error;
                }
            }
        } catch (error) {
            console.error("Error:", error);
            setReservationStatus("Failed to reserve table. Please try again.");
            alert("Failed to reserve table: " + error.message);
        } finally {
            setIsReserving(false);
        }
    };

    const handleViewReservation = () => {
        navigate("/my-reservations");
    };

    return (
        <div className="text-center">
            {showReservationForm ? (
                <div className="mb-4 bg-blue-800 p-4 rounded-lg">
                    <div className="mb-3">
                        <label className="block text-yellow-500 font-bold mb-2">Email (for reservation reminder)</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@example.com"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                </div>
            ) : null}
            
            {!reservationSuccess ? (
                <button
                    className={`mt-4 px-6 py-3 ${isReserving ? 'bg-gray-500' : 'bg-yellow-500 hover:bg-yellow-600'} text-black font-bold rounded-lg`}
                    onClick={handleConfirm}
                    disabled={isReserving}
                >
                    {isReserving ? "Processing..." : showReservationForm ? "Complete Reservation" : "Confirm Reservation"}
                </button>
            ) : (
                <button
                    className="mt-4 px-6 py-3 w-64 bg-yellow-500 text-black font-bold p-2 rounded w-full hover:bg-yellow-600 "
                    onClick={handleViewReservation}
                >
                    View Reservation
                </button>
            )}
            
            {reservationStatus && (
                <p className={`mt-4 ${reservationStatus.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
                    {reservationStatus}
                </p>
            )}
        </div>
    );
};

export default ConfirmReservationButton;

