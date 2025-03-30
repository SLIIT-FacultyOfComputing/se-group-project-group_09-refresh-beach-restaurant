import React, { useState, useEffect } from "react";
import ConfirmReservationButton from "./ConfirmReservationButton";

const TableLayout = ({ selectedDate, selectedTime }) => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTable, setSelectedTable] = useState(null);

    // Fetch tables from the backend
    useEffect(() => {
        const fetchTables = async () => {
            try {
                setLoading(true);
                // If date and time are selected, get available tables for that time
                const url = selectedDate && selectedTime 
                    ? `http://localhost:8085/api/tables/available?date=${selectedDate.toISOString().split('T')[0]}&time=${encodeURIComponent(selectedTime)}`
                    : 'http://localhost:8085/api/tables';
                
                console.log("Fetching tables from:", url);
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch tables: ${response.status}`);
                }
                
                const data = await response.json();
                console.log("Tables received:", data);
                setTables(data);
                setError(null);
            } catch (error) {
                console.error("Error fetching tables:", error);
                setError("Failed to load tables. Please try again.");
                // Use empty array as fallback
                setTables([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTables();
    }, [selectedDate, selectedTime]);

    const handleTableClick = (tableId) => {
        setSelectedTable(tableId);
        console.log("Selected table ID:", tableId);
    };

    return (
        <div className="w-full max-w-2xl">
            {/* Header */}
            <h2 className="text-xl font-bold mb-4 text-center text-white">
                Select a Table for {selectedDate ? selectedDate.toLocaleDateString() : ''} at {selectedTime}
            </h2>

            {/* Table Layout */}
            <div className="bg-white rounded-lg shadow-lg p-4">
                {loading ? (
                    <p className="text-center">Loading tables...</p>
                ) : error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : (
                    <div>
                        <div className="grid grid-cols-6 gap-2">
                            {tables.map((table) => (
                                <button
                                    key={table.id}
                                    className={`w-12 h-12 border rounded-lg text-white font-bold text-sm
    ${table.reserved || table.status === 'RESERVED'
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : selectedTable === table.id
                                            ? "bg-green-800"
                                            : "bg-green-600 hover:bg-green-700"}`}
                                    disabled={table.reserved || table.status === 'RESERVED'}
                                    onClick={() => handleTableClick(table.id)}
                                >
                                    {table.tableNumber}
                                </button>
                            ))}
                        </div>

                        {/* Show table details when selected */}
                        {selectedTable && tables.length > 0 && (
                            <div className="mt-4 text-center">
                                {(() => {
                                    const table = tables.find(t => t.id === selectedTable);
                                    return table ? (
                                        <>
                                            <p className="text-lg font-semibold">
                                                Table {table.tableNumber} Selected
                                            </p>
                                            <ConfirmReservationButton 
                                                tableId={table.id} 
                                                selectedDate={selectedDate} 
                                                selectedTime={selectedTime}
                                                tableName={table.tableNumber}
                                            />
                                        </>
                                    ) : null;
                                })()}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TableLayout;



