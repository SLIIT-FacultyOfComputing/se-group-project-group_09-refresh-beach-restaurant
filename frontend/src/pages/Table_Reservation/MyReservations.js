import React from "react";
import { useNavigate } from "react-router-dom";

const MyReservations = () => {
    const navigate = useNavigate();
    
    // Mock data - in a real app this would come from an API
    const reservations = [
        { id: 1, date: "2023-03-30", time: "18:00", table: "Table 1", guests: 2 },
        { id: 2, date: "2023-04-15", time: "19:30", table: "Table 4", guests: 4 }
    ];

    return (
        <div className="relative w-full h-screen bg-cover bg-center" 
             style={{ backgroundImage: "url('/images/reservation.jpg')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center pt-16">
                <h1 className="text-4xl font-bold mb-8 text-white">My Reservations</h1>
                
                {reservations.length > 0 ? (
                    <div className="w-2/3 max-w-3xl">
                        {reservations.map(reservation => (
                            <div key={reservation.id} 
                                 className="bg-blue-800 mb-4 p-4 rounded shadow-md text-white">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold text-yellow-600">
                                            {reservation.date} at {reservation.time}
                                        </h3>
                                        <p>{reservation.table} · {reservation.guests} guests</p>
                                    </div>
                                    <div>
                                        <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-white text-xl">No reservations found</div>
                )}
                
                <button
                    onClick={() => navigate("/")}
                    className="mt-8 bg-blue-700 hover:bg-blue-800 text-yellow-600 font-bold text-lg py-3 px-8 rounded"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default MyReservations;
