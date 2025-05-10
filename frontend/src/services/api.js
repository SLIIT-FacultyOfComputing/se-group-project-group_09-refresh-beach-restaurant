const API_BASE_URL = 'http://localhost:8085/api';

// Authentication API calls
export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // This is important for cookies/session
      body: JSON.stringify({ username, password }),
    });
    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const checkAuth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/check`, {
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.error('Auth check error:', error);
    throw error;
  }
};

// Reservation API calls
export const getAllTables = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tables`, {
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.error('Get tables error:', error);
    throw error;
  }
};

export const getAvailableTables = async (date, time) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/tables/available?date=${date}&time=${time}`,
      {
        credentials: 'include',
      }
    );
    return await response.json();
  } catch (error) {
    console.error('Get available tables error:', error);
    throw error;
  }
};

export const createReservation = async (customerId, tableId, reservationDate, reservationTime, peopleCount, contactNumber, customerEmail) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reservations/reserve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        customerId,
        tableId,
        reservationDate,
        reservationTime,
        peopleCount,
        contactNumber,
        customerEmail
      }),
    });
    return await response.json();
  } catch (error) {
    console.error('Create reservation error:', error);
    throw error;
  }
};

export const getUserReservations = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reservations/user/${userId}`, {
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.error('Get user reservations error:', error);
    throw error;
  }
};

export const cancelReservation = async (reservationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reservations/${reservationId}/cancel`, {
      method: 'PUT',
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.error('Cancel reservation error:', error);
    throw error;
  }
};

// Reservation Rating API calls
export const rateReservation = async (reservationId, rating, reviewText) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reservation-ratings/rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ reservationId, rating, reviewText }),
    });
    return await response.json();
  } catch (error) {
    console.error('Rate reservation error:', error);
    throw error;
  }
};

export const checkReservationRating = async (reservationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reservation-ratings/check/${reservationId}`, {
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.error('Check reservation rating error:', error);
    throw error;
  }
}; 