// Simple script to test restaurant API endpoints
import fetch from 'node-fetch';

const API_BASE_URL = 'http://localhost:8085/api';

async function createTable() {
  try {
    const response = await fetch(`${API_BASE_URL}/tables`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        capacity: 4,
        location: 'Test Table Location',
        reserved: false
      }),
    });
    
    const result = await response.json();
    console.log('Create Table Result:', result);
    return result;
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

async function createReservation(tableId) {
  try {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const response = await fetch(`${API_BASE_URL}/reservations/reserve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId: 1,
        tableId: tableId,
        reservationDate: formattedDate,
        reservationTime: '18:00:00'
      }),
    });
    
    const result = await response.json();
    console.log('Create Reservation Result:', result);
    return result;
  } catch (error) {
    console.error('Error creating reservation:', error);
  }
}

async function getAllTables() {
  try {
    const response = await fetch(`${API_BASE_URL}/tables`);
    const result = await response.json();
    console.log('All Tables:', result);
    return result;
  } catch (error) {
    console.error('Error getting tables:', error);
  }
}

async function getAllReservations() {
  try {
    const response = await fetch(`${API_BASE_URL}/reservations/all`);
    const result = await response.json();
    console.log('All Reservations:', result);
    return result;
  } catch (error) {
    console.error('Error getting reservations:', error);
  }
}

async function runTests() {
  console.log('=== Getting all tables ===');
  const tables = await getAllTables();
  
  let tableId;
  if (tables && tables.length > 0) {
    tableId = tables[0].id;
    console.log(`Using existing table with ID: ${tableId}`);
  } else {
    console.log('=== Creating new table ===');
    const newTable = await createTable();
    tableId = newTable.id;
  }
  
  console.log('=== Creating reservation ===');
  await createReservation(tableId);
  
  console.log('=== Getting all reservations ===');
  await getAllReservations();
}

runTests(); 