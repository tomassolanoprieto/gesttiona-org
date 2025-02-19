-- Add comment to document supported locations
COMMENT ON COLUMN properties.location IS 'Location of the property. Supports main Valencia areas and "otras" for other locations';

-- Drop existing location validation if exists
DROP TRIGGER IF EXISTS validate_location_trigger ON properties;
DROP FUNCTION IF EXISTS validate_location();

-- Create updated function to validate locations
CREATE OR REPLACE FUNCTION validate_location()
RETURNS TRIGGER AS $$
BEGIN
  -- Allow "otras" and all main locations
  IF NEW.location IN (
    'valencia-capital', 'horta-nord', 'horta-sud', 'horta-oest',
    'camp-turia', 'camp-morvedre', 'ribera-alta', 'ribera-baixa',
    'costera', 'vall-albaida', 'safor', 'otras'
  ) THEN
    RETURN NEW;
  END IF;
  
  -- If location is not in the main list, set it to "otras"
  NEW.location := 'otras';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to validate locations
CREATE TRIGGER validate_location_trigger
  BEFORE INSERT OR UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION validate_location();

-- Update existing records with invalid locations to "otras"
UPDATE properties 
SET location = 'otras' 
WHERE location NOT IN (
  'valencia-capital', 'horta-nord', 'horta-sud', 'horta-oest',
  'camp-turia', 'camp-morvedre', 'ribera-alta', 'ribera-baixa',
  'costera', 'vall-albaida', 'safor', 'otras'
);