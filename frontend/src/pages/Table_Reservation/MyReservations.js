import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserReservations, cancelReservation } from "../../services/api";
import { checkReservationRating } from "../../services/api";
import RatingModal from "../../components/Table_Reservation/ratings/RatingModal";
import StarRating from "../../components/Table_Reservation/ratings/StarRating";

const MyReservations = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming"); // Default to upcoming tab
  const [selectedReservationForRating, setSelectedReservationForRating] =
    useState(null);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [reservationRatings, setReservationRatings] = useState({});

  // Hardcoded user ID for now - will be replaced with actual user ID when authentication is implemented
  const userId = 1;

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const data = await getUserReservations(userId);
        console.log("Fetched reservations:", data);
        setReservations(data);
        setError(null);

        // Fetch ratings for past reservations
        fetchReservationRatings(data);
      } catch (err) {
        console.error("Error fetching reservations:", err);
        setError("Failed to load reservations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [userId]);

  const fetchReservationRatings = async (reservationData) => {
    const pastReservations = reservationData.filter(
      (res) => res.status === "PAST" || res.status === "CANCELED"
    );

    const ratings = {};

    for (const reservation of pastReservations) {
      try {
        const ratingData = await checkReservationRating(reservation.id);
        if (ratingData.isRated) {
          ratings[reservation.id] = ratingData.rating;
        }
      } catch (err) {
        console.error(
          `Error fetching rating for reservation ${reservation.id}:`,
          err
        );
      }
    }

    setReservationRatings(ratings);
  };

  const handleCancelReservation = async (reservationId) => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      try {
        const response = await cancelReservation(reservationId);

        if (response.success) {
          // Update the local state to reflect the canceled reservation
          setReservations((prevReservations) =>
            prevReservations.filter((r) => r.id !== reservationId)
          );
          alert("Reservation cancelled successfully");
        } else {
          alert(response.message || "Failed to cancel reservation");
        }
      } catch (err) {
        console.error("Error cancelling reservation:", err);
        alert("Error cancelling reservation. Please try again.");
      }
    }
  };

  const handleOpenRatingModal = (reservationId) => {
    setSelectedReservationForRating(reservationId);
    setIsRatingModalOpen(true);
  };

  const handleCloseRatingModal = () => {
    setSelectedReservationForRating(null);
    setIsRatingModalOpen(false);
  };

  const handleRatingSuccess = (reservationId, rating) => {
    // Update local state to reflect the new rating
    setReservationRatings((prev) => ({
      ...prev,
      [reservationId]: rating,
    }));
  };

  // Helper function to format time from 24-hour format to 12-hour format
  const formatTime = (timeString) => {
    if (!timeString) return "";

    // Parse the time string (expected format: HH:MM:SS)
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);

    // Determine AM/PM
    const ampm = hour >= 12 ? "PM" : "AM";

    // Convert 24-hour to 12-hour format
    const hour12 = hour % 12 || 12;

    // Return formatted time
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Filter reservations by status
  const upcomingReservations = reservations.filter(
    (res) => res.status === "UPCOMING"
  );

  const pastReservations = reservations.filter(
    (res) => res.status === "PAST" || res.status === "CANCELED"
  );

  // Determine if we have reservations to display in the current tab
  const hasReservationsToDisplay =
    activeTab === "upcoming"
      ? upcomingReservations.length > 0
      : pastReservations.length > 0;

  // Function to render a reservation card
  const renderReservationCard = (reservation) => {
    const isRated = reservationRatings.hasOwnProperty(reservation.id);

    return (
      <div
        key={reservation.id}
        className="bg-white mb-4 p-4 rounded shadow-md text-black"
      >
        <div className="flex justify-between">
          <div>
            <h3 className="text-xl font-semibold text-black">
              {reservation.reservationDate.toString()} at{" "}
              {formatTime(reservation.reservationTime)}
            </h3>
            <p>
              Table {reservation.tableNumber || reservation.tableId} -{" "}
              {reservation.peopleCount || 2} guests
            </p>
            <p className="mt-1">
              <span
                className={`
                                px-2 py-1 rounded text-white text-xs 
                                ${
                                  reservation.status === "CANCELED"
                                    ? "bg-red-500"
                                    : reservation.status === "UPCOMING"
                                    ? "bg-green-700"
                                    : "bg-gray-700"
                                }
                            `}
              >
                {reservation.status}
              </span>
            </p>

            {/* Show stars if rated */}
            {isRated && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-1">Your Rating:</p>
                <StarRating
                  initialRating={reservationRatings[reservation.id]}
                  readOnly={true}
                />
              </div>
            )}
          </div>

          {/* Show appropriate button based on status */}
          {reservation.status === "UPCOMING" && (
            <div>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                onClick={() => handleCancelReservation(reservation.id)}
              >
                Cancel
              </button>
            </div>
          )}

          {reservation.status === "PAST" && !isRated && (
            <div>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                onClick={() => handleOpenRatingModal(reservation.id)}
              >
                Rate
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-white bg-opacity-90 flex flex-col items-center pt-16 pb-16">
      <h1 className="text-4xl font-bold mb-8 text-black ">My Reservations</h1>

      {/* Tabs for switching between upcoming and past reservations */}
      <div className="flex mb-8 bg-white rounded-lg w-2/3 max-w-3xl  shadow-md overflow-hidden">
        <button
          className={`flex-1 py-2 px-4 font-medium text-lg transition-colors duration-200 ${
            activeTab === "upcoming"
              ? "bg-green-700 text-white"
              : "bg-white text-black hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`flex-1 py-2 px-4 font-medium text-lg transition-colors duration-200 ${
            activeTab === "past"
              ? "bg-gray-700 text-white"
              : "bg-white text-black hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("past")}
        >
          Past
        </button>
      </div>

      {loading ? (
        <div className="text-black text-xl">Loading reservations...</div>
      ) : error ? (
        <div className="text-red-500 text-xl">{error}</div>
      ) : hasReservationsToDisplay ? (
        <div className="w-2/3 max-w-3xl">
          {activeTab === "upcoming"
            ? upcomingReservations.map(renderReservationCard)
            : pastReservations.map(renderReservationCard)}
        </div>
      ) : (
        <div className="text-black text-xl">
          No {activeTab} reservations found
        </div>
      )}

      <button
        onClick={() => navigate("/")}
        className="mt-8 bg-white text-black font-bold text-lg py-3 px-8 rounded border border-black hover:bg-gray-400 hover:text-white hover:border-0 "
      >
        Back to Home
      </button>

      {/* Rating Modal */}
      <RatingModal
        isOpen={isRatingModalOpen}
        onClose={handleCloseRatingModal}
        reservationId={selectedReservationForRating}
        onRatingSuccess={(rating) =>
          handleRatingSuccess(selectedReservationForRating, rating)
        }
      />
    </div>
  );
};

export default MyReservations;
