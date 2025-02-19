/*
  # Update Properties RLS Policies and Triggers

  1. Changes
    - Simplify RLS policies for better update handling
    - Add better error handling for updates
    - Ensure user_id is properly handled in updates
  
  2. Security
    - Maintain security while allowing proper updates
    - Keep row-level security enabled
    - Ensure only authorized users can update their properties
*/

-- Drop existing update policy
DROP POLICY IF EXISTS "Users can update their own properties" ON properties;

-- Create new update policy with better handling
CREATE POLICY "Users can update their own properties" 
ON properties
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Ensure the updated_at trigger is working correctly
DROP TRIGGER IF EXISTS update_properties_updated_at ON properties;
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add function to validate property updates
CREATE OR REPLACE FUNCTION validate_property_update()
RETURNS TRIGGER AS $$
BEGIN
  -- Ensure required fields are present
  IF NEW.title IS NULL OR NEW.price IS NULL OR NEW.location IS NULL THEN
    RAISE EXCEPTION 'Required fields cannot be null';
  END IF;
  
  -- Preserve user_id
  NEW.user_id = OLD.user_id;
  
  -- Update updated_at timestamp
  NEW.updated_at = CURRENT_TIMESTAMP;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add validation trigger
DROP TRIGGER IF EXISTS validate_property_update_trigger ON properties;
CREATE TRIGGER validate_property_update_trigger
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION validate_property_update();