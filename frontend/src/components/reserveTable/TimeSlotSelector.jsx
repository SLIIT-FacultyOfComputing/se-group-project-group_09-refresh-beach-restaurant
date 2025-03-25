import React from "react";

const TimeSlotSelector = ({ selectedTime, setSelectedTime }) => {
    // Create time slots from 9 AM to 9 PM (restaurant hours)
    const timeSlots = [];
    for (let hour = 9; hour <= 21; hour++) {
        // Format in 24-hour format for API compatibility
        const formattedHour = hour.toString().padStart(2, '0');
        timeSlots.push(`${formattedHour}:00`);
        timeSlots.push(`${formattedHour}:30`);
    }

    return (
        <div className="mb-4">
            <label className="block text-yellow-600 font-semibold mb-2">
                Select Time
            </label>
            <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full p-2 border rounded bg-white"
                required
            >
                <option value="">Choose a time</option>
                {timeSlots.map((time) => (
                    <option key={time} value={time}>
                        {time}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TimeSlotSelector;
