import React, { useState } from "react";
import ConfirmReservationButton from "./ConfirmReservationButton";

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
        <div className="flex flex-wrap items-center justify-center h-auto p-6">
            {/* Header */}
            <h2 className="text-xl font-bold mb-4 text-center">
                Select a Table for {selectedDate} at {selectedTime}
            </h2>

            {/* Table Layout */}
            <div className="bg-white p-10 rounded-lg shadow-lg mx-auto ">
                    <div className="grid grid-cols-6 gap-4 p-4">
                    {tables.map((table) => (
                        <button
                            key={table.id}
                            className={`w-16 h-16 border rounded-lg text-white font-bold
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
                        <ConfirmReservationButton tableId={selectedTable} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default TableLayout;



