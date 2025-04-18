# Database Maintenance Scripts

This directory contains SQL scripts for maintaining and fixing the restaurant reservation database.

## Script Descriptions

### 01_cleanup_duplicate_reservations.sql
- Identifies and removes duplicate reservations for the same table, date, and time
- Keeps only the oldest reservation for each combination
- Updates any duplicate reservations to CANCELED status

### 02_reset_tables_to_available.sql
- Simple script to reset all tables to AVAILABLE status
- Useful for clearing the state of all tables when needed

### 03_update_table_locations.sql
- Sets location values for tables based on table numbers
- Tables 1-20 are set as INDOOR
- Tables 21-35 are set as OUTDOOR

### 04_fix_database_consistency.sql
- General database consistency fixes
- Standardizes reservation status values (converts case)
- Marks past reservations with PAST status
- Identifies duplicate reservations

### 05_comprehensive_table_update.sql
- Complete table maintenance script
- Updates table statuses
- Identifies invalid or past reservations
- Updates past reservations to PAST status
- Checks for orphaned reservations (tables that don't exist)
- Verifies the state of tables and upcoming reservations

### 06_add_reservation_indexes.sql
- Adds database indexes to improve query performance
- Creates an index for looking up reservations by table, date, time, and status
- Creates an index for looking up reservations by customer ID
- Significantly improves performance for availability checks and customer reservation history

## Usage

Execute these scripts in numerical order when performing database maintenance or when
troubleshooting database consistency issues.
