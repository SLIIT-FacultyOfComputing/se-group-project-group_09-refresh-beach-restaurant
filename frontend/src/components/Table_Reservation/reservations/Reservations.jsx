import React from "react";
import { useNavigate } from "react-router-dom";

const Reservations = () => {
    const navigate = useNavigate();

    return (
        <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/reservation.jpg')" }}>
            <div className="absolute right-0 w-full h-full bg-black bg-opacity-80 flex flex-col justify-center items-center text-yellow">
                <h1 className="text-4xl font-bold mb-6 text-white drop-shadow-lg shadow-bg-blue-700">Reservations</h1>
                <button
                    onClick={() => navigate("/reserve")}
                    className="w-80 bg-blue-700 hover:bg-blue-800 text-yellow-600 font-bold  text-lg py-4 px-10 rounded mb-4 "
                >
                    Reserve a Table
                </button>
                <button
                    onClick={() => navigate("/my-reservations")}
                    className="w-80 bg-blue-700 hover:bg-blue-800 text-yellow-600 font-bold text-lg py-4 px-10 rounded "
                >
                    My Reservations
                </button>
            </div>
        </div>
    );
};

export default Reservations;

