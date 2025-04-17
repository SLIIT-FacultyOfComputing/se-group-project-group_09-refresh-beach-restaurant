-- Add index to improve reservation lookup performance
-- This index helps with queries that check for table availability at a specific date and time

-- First, check if the index already exists
SELECT COUNT(1) IndexIsThere FROM INFORMATION_SCHEMA.STATISTICS
WHERE table_schema=DATABASE() AND table_name='reservations' AND index_name='idx_reservations_table_date_time_status';

-- Create index for faster reservation lookups
CREATE INDEX IF NOT EXISTS idx_reservations_table_date_time_status 
ON reservations (table_id, reservation_date, reservation_time, status);

-- Create index for searching customer reservations
CREATE INDEX IF NOT EXISTS idx_reservations_customer_id
ON reservations (customer_id);

-- Note: These indexes will significantly improve query performance for:
-- 1. Checking if a table is available for a specific date/time
-- 2. Retrieving all reservations for a specific customer
-- 3. Finding duplicate reservations 