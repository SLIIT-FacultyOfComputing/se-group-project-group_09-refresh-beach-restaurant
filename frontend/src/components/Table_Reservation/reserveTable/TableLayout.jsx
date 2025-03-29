import React, { useState, useEffect } from "react";
import ConfirmReservationButton from "./ConfirmReservationButton";
import { reservationApi } from "../../../services/api";

const TableLayout = ({ selectedDate, selectedTime }) => {
    const [selectedTable, setSelectedTable] = useState(null);
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAvailableTables();
    }, [selectedDate, selectedTime]);

    const fetchAvailableTables = async () => {
        if (!selectedDate || !selectedTime) {
            return;
        }

        try {
            setLoading(true);
            
            // Format date as YYYY-MM-DD
            const formattedDate = selectedDate instanceof Date 
                ? selectedDate.toISOString().split('T')[0] 
                : selectedDate;
            
            // Use API service instead of direct fetch
            const availableTables = await reservationApi.getAvailableTables(formattedDate, selectedTime, 2);
            
            // If we get data from backend
            if (availableTables && availableTables.length > 0) {
                setTables(availableTables.map(table => ({
                    id: table.table_id, // Updated to match new backend schema
                    tableNumber: table.table_number, // Updated to match new backend schema
                    capacity: table.capacity,
                    reserved: table.status !== 'AVAILABLE' // Updated to match new backend schema
                })));
            } else {
                // For demo/testing if the backend doesn't return data yet
                // Mock 10 tables
                setTables(Array.from({ length: 10 }, (_, i) => ({
                    id: i + 1,
                    tableNumber: i + 1,
                    capacity: i % 3 === 0 ? 2 : (i % 3 === 1 ? 4 : 6),
                    reserved: Math.random() > 0.7 // Randomly reserve some tables
                })));
            }
            
            setError(null);
        } catch (err) {
            console.error("Failed to fetch available tables:", err);
            setError("Failed to load available tables. Using sample data.");
            
            // Mock data in case of error
            setTables(Array.from({ length: 10 }, (_, i) => ({
                id: i + 1,
                tableNumber: i + 1,
                capacity: i % 3 === 0 ? 2 : (i % 3 === 1 ? 4 : 6),
                reserved: i % 5 === 0
            })));
        } finally {
            setLoading(false);
        }
    };

    const handleTableClick = (tableId) => {
        setSelectedTable(tableId);
    };

    return (
        <div className="w-full max-w-2xl">
            {/* Header */}
            <h2 className="text-xl font-bold mb-4 text-center text-white">
                Select a Table for {selectedDate ? selectedDate.toLocaleDateString() : ''} at {selectedTime}
            </h2>

            {loading ? (
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <p className="text-lg">Loading available tables...</p>
                </div>
            ) : error ? (
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <p className="text-red-500">{error}</p>
                    <div className="grid grid-cols-5 gap-3 mt-4">
                        {tables.map((table) => (
                            <button
                                key={table.id}
                                className={`w-14 h-14 border rounded-lg text-white font-bold
                                    ${table.reserved ? "bg-red-500 cursor-not-allowed" : ""}
                                    ${selectedTable === table.id ? "bg-blue-500" : "bg-green-500 hover:bg-green-700"}`}
                                disabled={table.reserved}
                                onClick={() => handleTableClick(table.id)}
                            >
                                {table.tableNumber || table.id}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-lg p-4">
                    {tables.length > 0 ? (
                        <div className="grid grid-cols-5 gap-3">
                            {tables.map((table) => (
                                <button
                                    key={table.id}
                                    className={`w-14 h-14 border rounded-lg text-white font-bold
                                        ${table.reserved ? "bg-red-500 cursor-not-allowed" : ""}
                                        ${selectedTable === table.id ? "bg-blue-500" : "bg-green-500 hover:bg-green-700"}`}
                                    disabled={table.reserved}
                                    onClick={() => handleTableClick(table.id)}
                                >
                                    {table.tableNumber || table.id}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center p-4">No tables available for this date and time.</p>
                    )}

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
            )}
        </div>
    );
};

export default TableLayout;



