import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminReservationsList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8085/api/reservations/all');
        setReservations(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching reservations:', err);
        setError('Failed to load reservations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  // Helper function to format time from 24-hour format to 12-hour format
  const formatTime = (timeString) => {
    if (!timeString) return "";
    
    // Parse the time string (expected format: HH:MM:SS)
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    
    // Determine AM/PM
    const ampm = hour >= 12 ? 'PM' : 'AM';
    
    // Convert 24-hour to 12-hour format
    const hour12 = hour % 12 || 12;
    
    // Return formatted time
    return `${hour12}:${minutes} ${ampm}`;
  };

  if (loading) {
    return <div className="text-center p-4">Loading reservations...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Reservations</h2>
      
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Customer ID</th>
                <th className="py-2 px-4 border-b">Table ID</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Time</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Email</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{reservation.id}</td>
                  <td className="py-2 px-4 border-b">{reservation.customerId}</td>
                  <td className="py-2 px-4 border-b">{reservation.tableId}</td>
                  <td className="py-2 px-4 border-b">{reservation.reservationDate}</td>
                  <td className="py-2 px-4 border-b">{formatTime(reservation.reservationTime)}</td>
                  <td className="py-2 px-4 border-b">
                    <span className={`px-2 py-1 rounded text-white text-xs 
                      ${reservation.status === 'CANCELED' ? 'bg-red-500' : 
                      reservation.status === 'UPCOMING' ? 'bg-green-500' : 'bg-gray-500'}`}>
                      {reservation.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">{reservation.customerEmail || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminReservationsList; 