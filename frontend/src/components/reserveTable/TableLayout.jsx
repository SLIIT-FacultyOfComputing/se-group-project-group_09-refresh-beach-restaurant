import React, { useState, useEffect } from "react";
import ConfirmReservationButton from "./ConfirmReservationButton";
import { getAvailableTables } from "../../services/api";

const TableLayout = ({ selectedDate, selectedTime }) => {
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAvailableTables = async () => {
            if (!selectedDate || !selectedTime) {
                return;
            }

            try {
                setLoading(true);
                // Format date as YYYY-MM-DD for API
                const formattedDate = selectedDate.toISOString().split('T')[0];
                // Time should already be in HH:MM format
                const availableTables = await getAvailableTables(formattedDate, selectedTime);
                setTables(availableTables);
                setError("");
            } catch (err) {
                console.error("Error fetching tables:", err);
                setError("Failed to load tables. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchAvailableTables();
    }, [selectedDate, selectedTime]);

    const handleTableClick = (tableId) => {
        setSelectedTable(tableId);
    };

    if (loading) {
        return <div className="text-center p-4">Loading tables...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">{error}</div>;
    }

    return (
        <div className="flex flex-col items-center w-full max-w-lg">
            {/* Header */}
            <h2 className="text-xl font-bold mb-4 text-center text-white">
                Select a Table for {selectedDate ? selectedDate.toLocaleDateString() : ""} at {selectedTime}
            </h2>

            {/* Table Layout */}
            <div className="bg-white p-8 rounded-lg shadow-lg w-full">
                <div className="grid grid-cols-6 gap-4 p-4">
                    {tables.map((table) => (
                        <button
                            key={table.tableId}
                            className={`w-16 h-16 border rounded-lg text-white font-bold
                                ${table.status !== "AVAILABLE" ? "bg-red-500 cursor-not-allowed" : ""}
                                ${selectedTable === table.tableId ? "bg-blue-500" : "bg-green-500 hover:bg-green-700"}`}
                            disabled={table.status !== "AVAILABLE"}
                            onClick={() => handleTableClick(table.tableId)}
                        >
                            {table.tableNumber}
                        </button>
                    ))}
                </div>

                {/* Confirm Button */}
                {selectedTable && (
                    <div className="mt-4 text-center">
                        <p className="text-lg font-semibold">Table Selected</p>
                        <ConfirmReservationButton 
                            tableId={selectedTable} 
                            selectedDate={selectedDate ? selectedDate.toISOString().split('T')[0] : ""}
                            selectedTime={selectedTime} 
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default TableLayout;



