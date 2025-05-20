-- Reset all tables to AVAILABLE status
UPDATE tables SET status = 'AVAILABLE';

-- Identify duplicate reservations (same table, date, time)
SELECT table_id, reservation_date, reservation_time, COUNT(*) as reservation_count
FROM reservations
WHERE status = 'UPCOMING'
GROUP BY table_id, reservation_date, reservation_time
HAVING COUNT(*) > 1;

-- Keep the oldest reservation for each combination and cancel the others
-- This is a multi-step process in standard SQL

-- Step 1: Create a temporary table with the reservations to keep (oldest for each combo)
CREATE TEMPORARY TABLE reservations_to_keep AS
SELECT MIN(reservation_id) as reservation_id
FROM reservations
WHERE status = 'UPCOMING'
GROUP BY table_id, reservation_date, reservation_time;

-- Step 2: Update all reservations to CANCELED
UPDATE reservations 
SET status = 'CANCELED'
WHERE status = 'UPCOMING' 
AND reservation_id NOT IN (SELECT reservation_id FROM reservations_to_keep);

-- Step 3: Cleanup
DROP TEMPORARY TABLE IF EXISTS reservations_to_keep;

-- Verify the results
SELECT * FROM reservations 
WHERE reservation_date = '2025-04-12' AND reservation_time = '15:00:00'
ORDER BY table_id, reservation_date, reservation_time; 