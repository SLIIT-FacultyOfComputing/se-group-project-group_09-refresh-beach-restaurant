import React, { useState } from "react";
import CalendarPicker from "./CalendarPicker";
import TimeSlotSelector from "./TimeSlotSelector";
import SubmitButton from "./SubmitButton";
import TableLayout from "./TableLayout";

const ReservationForm = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [showTables, setShowTables] = useState(false);

    const handleSubmit = () => {
        console.log("Table Reserved on:", selectedDate, "at", selectedTime);
        setShowTables(true); // Show tables after submission
    };

    return (
        <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/reservation.jpg')" }}>
            <div className="absolute inset-0 bg-black/75 flex justify-center items-center">
                <div className="p-4 border border-transparent rounded shadow-md w-96 bg-blue-800 absolute left-40 top-1/2 transform -translate-y-1/2">
                    <h2 className="text-xl text-yellow-600 font-bold mb-4 text-center">Reserve Your Table Here</h2>
                    <CalendarPicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                    <TimeSlotSelector selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
                    <SubmitButton onSubmit={handleSubmit} />
                </div>

                {showTables && (
                    <div className="absolute right-40 transform -translate-y-1/2">
                        <TableLayout selectedDate={selectedDate} selectedTime={selectedTime} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReservationForm;

