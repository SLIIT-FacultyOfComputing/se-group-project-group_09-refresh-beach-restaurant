import React, { useState } from "react";
import CalendarPicker from "./CalendarPicker";
import TimeSlotSelector from "./TimeSlotSelector";
import SubmitButton from "./SubmitButton";
import TableLayout from "./TableLayout";

const ReservationForm = ({ user }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [showTables, setShowTables] = useState(false);

    const handleSubmit = () => {
        if (!selectedDate || !selectedTime) {
            alert("Please select both date and time");
            return;
        }

        // Check if date is in the past
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            alert("Please select a future date");
            return;
        }

        console.log("Searching for tables on:", selectedDate.toLocaleDateString(), "at", selectedTime);
        setShowTables(true); // Show tables after validation
    };

    return (
        <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/reservation.jpg')" }}>
            <div className="absolute inset-0 bg-black/75 flex justify-between px-20">
                {/* Left side - Reservation form */}
                <div className="w-2/5 h-full flex items-center">
                    <div className="p-6 border border-transparent rounded shadow-md w-full max-w-md bg-blue-800">
                        <h2 className="text-xl text-yellow-600 font-bold mb-4 text-center">Reserve Your Table Here</h2>

                        {user && (
                            <div className="mb-4 p-2 bg-blue-900 rounded text-white">
                                <p>Welcome, {user.fullName}</p>
                            </div>
                        )}

                        <CalendarPicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                        <TimeSlotSelector selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
                        <SubmitButton onSubmit={handleSubmit} />
                    </div>
                </div>

                {/* Right side - Table layout */}
                <div className="w-3/5 h-full flex items-center justify-center">
                    {showTables && selectedDate && selectedTime ? (
                        <TableLayout selectedDate={selectedDate} selectedTime={selectedTime} />
                    ) : (
                        <div className="text-white text-xl text-center">
                            <p>Available Tables will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReservationForm;

