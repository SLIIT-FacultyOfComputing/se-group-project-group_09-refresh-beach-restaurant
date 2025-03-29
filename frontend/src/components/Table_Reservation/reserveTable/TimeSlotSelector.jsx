import React from "react";

const TimeSlotSelector = ({ selectedTime, setSelectedTime }) => {
    const timeSlots = [
        "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", 
        "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", 
        "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"
    ];

    return (
        <div className="mb-4">
            <label className="block mb-1 font-semibold">Select a Time</label>
            <select
                className="border p-2 rounded w-full"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
            >
                <option value="">-- Choose Time --</option>
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
