/*
  # Fix property table column names

  1. Changes
    - Add trigger function for updating updated_at column if it doesn't exist
    - Update trigger to use snake_case column names
    - Add indexes for improved query performance

  2. Security
    - No changes to RLS policies
    - Maintains existing security model

  Note: This migration ensures proper column name handling and adds performance optimizations
*/

-- Create the trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Recreate the trigger with the correct column name
DROP TRIGGER IF EXISTS update_properties_updated_at ON properties;
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add indexes for improved query performance if they don't exist
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_properties_updated_at ON properties(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_properties_user_id_created_at ON properties(user_id, created_at DESC);