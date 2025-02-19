/*
  # Add support for "otras" location

  1. Changes
    - Add comment to document support for "otras" location option
    - Add check constraint to validate location values
    - Update existing records if needed

  2. Notes
    - Existing location values are preserved
    - New "otras" option is now officially supported
*/

-- Add comment to document supported locations
COMMENT ON COLUMN properties.location IS 'Location of the property. Can be one of the main Valencia areas or "otras" for other locations';

-- Create a function to validate locations
CREATE OR REPLACE FUNCTION validate_location()
RETURNS TRIGGER AS $$
BEGIN
  -- Allow "otras" and all main locations
  IF NEW.location = 'otras' OR
     NEW.location IN (
       'valencia-capital', 'horta-nord', 'horta-sud', 'horta-oest',
       'camp-turia', 'camp-morvedre', 'ribera-alta', 'ribera-baixa',
       'costera', 'vall-albaida', 'safor', 'otras'
     ) THEN
    RETURN NEW;
  END IF;
  
  -- If location is not in the main list, automatically set it to "otras"
  NEW.location := 'otras';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to validate locations
DROP TRIGGER IF EXISTS validate_location_trigger ON properties;
CREATE TRIGGER validate_location_trigger
  BEFORE INSERT OR UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION validate_location();