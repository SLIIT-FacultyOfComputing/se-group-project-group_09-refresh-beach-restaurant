-- Reset all tables to AVAILABLE status
UPDATE tables SET status = 'AVAILABLE';

-- Fix ReservationStatus case in the database
-- If your database uses 'Upcoming' instead of 'UPCOMING', we can convert all to uppercase
UPDATE reservations 
SET status = 'UPCOMING' 
WHERE status = 'Upcoming';

-- Make sure past reservations are properly marked
UPDATE reservations 
SET status = 'PAST' 
WHERE status = 'UPCOMING' AND reservation_date < CURDATE();

-- Check if there are any duplicate reservations for the same table, date and time
SELECT table_id, reservation_date, reservation_time, COUNT(*) as count
FROM reservations
WHERE status = 'UPCOMING'
GROUP BY table_id, reservation_date, reservation_time
HAVING COUNT(*) > 1;

-- Verify reservations for a specific date and time
-- Replace '2025-04-12' and '15:00:00' with the date/time you're testing
SELECT * FROM reservations
WHERE reservation_date = '2025-04-12' AND reservation_time = '15:00:00' AND status = 'UPCOMING'; 