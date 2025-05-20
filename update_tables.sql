-- Set all tables to AVAILABLE first
UPDATE tables SET status = 'AVAILABLE';

-- If there are any tables that should be permanently unavailable,
-- you can set them to OCCUPIED here:
-- UPDATE tables SET status = 'OCCUPIED' WHERE table_id IN (...);

-- Check and update reservations for consistency
-- First, identify any invalid or past reservations
SELECT * FROM reservations WHERE reservation_date < CURDATE() AND status = 'UPCOMING';

-- Update past reservations to have 'PAST' status
UPDATE reservations 
SET status = 'PAST' 
WHERE status = 'UPCOMING' AND reservation_date < CURDATE();

-- Check if there are any reservations with missing tableId
SELECT * FROM reservations WHERE table_id IS NULL;

-- Check for any mismatches between tableId in reservations and table_id in tables
SELECT r.reservation_id, r.table_id 
FROM reservations r 
LEFT JOIN tables t ON r.table_id = t.table_id 
WHERE t.table_id IS NULL AND r.status = 'UPCOMING';

-- You can run this to fix any orphaned reservations (if needed):
-- UPDATE reservations SET status = 'CANCELED' 
-- WHERE table_id NOT IN (SELECT table_id FROM tables) AND status = 'UPCOMING';

-- Finally, verify the state of tables and upcoming reservations
SELECT t.table_id, t.status, r.reservation_id, r.reservation_date, r.reservation_time, r.status 
FROM tables t
LEFT JOIN reservations r ON t.table_id = r.table_id AND r.status = 'UPCOMING' 
ORDER BY t.table_id;

-- You can exclude tables that should remain permanently unavailable
-- For example, if tables under maintenance should stay OCCUPIED:
-- UPDATE tables 
-- SET status = 'OCCUPIED' 
-- WHERE table_id IN (42, 47);

-- Add customer_email column to reservations table
ALTER TABLE reservations ADD COLUMN customer_email VARCHAR(255) DEFAULT NULL; 