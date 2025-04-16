import React from "react";

const CalendarPicker = ({ selectedDate, setSelectedDate }) => {
    const handleDateChange = (e) => {
        // Convert the string date to a Date object
        const dateString = e.target.value;
        if (dateString) {
            const dateObject = new Date(dateString);
            setSelectedDate(dateObject);
        } else {
            setSelectedDate(null);
        }
    };

    // Get today's date for the min attribute
    const today = new Date();
    const minDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    // Format date for the input value
    const formattedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : '';

    return (
        <div className="mb-4">
            <label className="block mb-1 font-semibold">Select a Date</label>
            <input
                type="date"
                className="border p-2 rounded w-full"
                value={formattedDate}
                onChange={handleDateChange}
                min={minDate} // This prevents selecting dates before today
            />

        </div>
    );
};

export default CalendarPicker;

