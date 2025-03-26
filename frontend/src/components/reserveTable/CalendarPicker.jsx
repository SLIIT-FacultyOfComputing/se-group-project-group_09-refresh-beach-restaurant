import React from "react";

const CalendarPicker = ({ selectedDate, setSelectedDate }) => {
    const handleDateChange = (e) => {
        const dateValue = e.target.value;
        if (dateValue) {
            setSelectedDate(new Date(dateValue));
        } else {
            setSelectedDate(null);
        }
    };

    // Generate today's date in YYYY-MM-DD format for min attribute
    const today = new Date().toISOString().split('T')[0];
    
    return (
        <div className="mb-4">
            <label className="block text-yellow-600 font-semibold mb-2">
                Select Date
            </label>
            <input
                type="date"
                className="w-full p-2 border rounded bg-white"
                min={today}
                value={selectedDate ? selectedDate.toISOString().split('T')[0] : ""}
                onChange={handleDateChange}
                required
            />
        </div>
    );
};

export default CalendarPicker; 