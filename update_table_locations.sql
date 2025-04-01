-- Update indoor tables (1-20)
UPDATE tables
SET location = 'INDOOR'
WHERE table_number BETWEEN 1 AND 20;

-- Update outdoor tables (21-35)
UPDATE tables
SET location = 'OUTDOOR'
WHERE table_number BETWEEN 21 AND 35;

-- Verify the updates
SELECT table_id, table_number, location, status
FROM tables
ORDER BY table_number; 