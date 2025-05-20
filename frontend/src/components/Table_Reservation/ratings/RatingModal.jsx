import React, { useState } from 'react';
import StarRating from './StarRating';
import { rateReservation } from '../../../services/api';

const RatingModal = ({ isOpen, onClose, reservationId, onRatingSuccess }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [wordCount, setWordCount] = useState(0);

  const handleReviewChange = (e) => {
    const text = e.target.value;
    setReviewText(text);
    
    // Count words
    const words = text.trim() ? text.trim().split(/\s+/) : [];
    setWordCount(words.length);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    if (wordCount > 20) {
      setError('Review cannot exceed 20 words');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      
      const response = await rateReservation(reservationId, rating, reviewText);
      
      if (response.success) {
        if (onRatingSuccess) {
          onRatingSuccess(rating);
        }
        onClose();
      } else {
        setError(response.message || 'Failed to submit rating');
      }
    } catch (err) {
      console.error('Error submitting rating:', err);
      setError('Failed to submit rating. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
        <h2 className="text-xl font-bold mb-4">Rate Your Dining Experience</h2>
        
        <div className="mb-6">
          <p className="text-gray-700 mb-2">How would you rate your experience?</p>
          <div className="flex justify-center">
            <StarRating onChange={setRating} />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            Additional Comments (Optional):
            <span className={`ml-2 text-sm ${wordCount > 20 ? 'text-red-500' : 'text-gray-500'}`}>
              {wordCount}/20 words
            </span>
          </label>
          <textarea
            className="w-full border rounded p-2 h-24"
            value={reviewText}
            onChange={handleReviewChange}
            placeholder="Share your thoughts (max 20 words)"
          />
        </div>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-400"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Rating'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal; 