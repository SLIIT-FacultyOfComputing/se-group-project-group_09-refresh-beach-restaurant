import React from "react";

const CalendarPicker = ({ selectedDate, setSelectedDate }) => {
    return (
        <div className="mb-4">
            <label className="block mb-1 font-semibold">Select a Date</label>
            <input
                type="date"
                className="border p-2 rounded w-full"
                value={selectedDate || ""}
                onChange={(e) => setSelectedDate(e.target.value)}
            />
        </div>
    );
};

export default CalendarPicker;

