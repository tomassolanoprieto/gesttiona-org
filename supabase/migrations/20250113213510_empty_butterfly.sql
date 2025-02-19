-- Update property categories constraint
ALTER TABLE properties 
  DROP CONSTRAINT IF EXISTS properties_category_check;

ALTER TABLE properties 
  ADD CONSTRAINT properties_category_check 
  CHECK (category IN ('pisos', 'casas', 'chalets', 'aticos', 'locales', 'oficinas', 'naves', 'edificios'));