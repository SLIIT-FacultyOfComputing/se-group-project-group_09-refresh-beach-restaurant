import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminRatingsList = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8085/api/reservation-ratings/all');
        setRatings(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching ratings:', err);
        setError('Failed to load ratings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <span key={index} className={`text-xl ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  if (loading) {
    return <div className="text-center p-4">Loading ratings...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Reservation Ratings</h2>
      
      {ratings.length === 0 ? (
        <p>No ratings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Reservation ID</th>
                <th className="py-2 px-4 border-b">Rating</th>
                <th className="py-2 px-4 border-b">Review</th>
                <th className="py-2 px-4 border-b">Created At</th>
              </tr>
            </thead>
            <tbody>
              {ratings.map((rating) => (
                <tr key={rating.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{rating.id}</td>
                  <td className="py-2 px-4 border-b">{rating.reservationId}</td>
                  <td className="py-2 px-4 border-b">{renderStars(rating.rating)}</td>
                  <td className="py-2 px-4 border-b">{rating.reviewText || "No review"}</td>
                  <td className="py-2 px-4 border-b">{rating.createdAt ? new Date(rating.createdAt).toLocaleString() : "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminRatingsList; 