-- Reset all tables to AVAILABLE status
UPDATE tables SET status = 'AVAILABLE';

-- Verify the update worked correctly
SELECT table_id, table_number, status FROM tables; 