import React, { useState } from "react";
import ConfirmReservationButton from "./ConfirmReservationButton";

// Reduce the number of tables to prevent scrolling
const tables = Array.from({ length: 35 }, (_, i) => ({
    id: i + 1,
    reserved: false, // Later, update this from the backend
}));

const TableLayout = ({ selectedDate, selectedTime }) => {
    const [selectedTable, setSelectedTable] = useState(null);

    const handleTableClick = (tableId) => {
        setSelectedTable(tableId);
    };

    return (
        <div className="w-full max-w-2xl">
            {/* Header */}
            <h2 className="text-xl font-bold mb-4 text-center text-white">
                Select a Table for {selectedDate ? selectedDate.toLocaleDateString() : ''} at {selectedTime}
            </h2>

            {/* Table Layout */}
            <div className="bg-white rounded-lg shadow-lg p-4">
                <div className="grid grid-cols-6 gap-2">
                    {tables.map((table) => (
                        <button
                            key={table.id}
                            className={`w-12 h-12 border rounded-lg text-white font-bold text-sm
                                ${table.reserved ? "bg-red-500 cursor-not-allowed" : ""}
                                ${selectedTable === table.id ? "bg-blue-500" : "bg-green-500 hover:bg-green-700"}`}
                            disabled={table.reserved}
                            onClick={() => handleTableClick(table.id)}
                        >
                            {table.id}
                        </button>
                    ))}
                </div>

                {/* Confirm Button */}
                {selectedTable && (
                    <div className="mt-4 text-center">
                        <p className="text-lg font-semibold">Table {selectedTable} Selected</p>
                        <ConfirmReservationButton 
                            tableId={selectedTable} 
                            selectedDate={selectedDate} 
                            selectedTime={selectedTime} 
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default TableLayout;



