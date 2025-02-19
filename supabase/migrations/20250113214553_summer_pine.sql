-- Update property categories constraint to match frontend options exactly
ALTER TABLE properties 
  DROP CONSTRAINT IF EXISTS properties_category_check;

ALTER TABLE properties 
  ADD CONSTRAINT properties_category_check 
  CHECK (category IN ('pisos', 'casas', 'chalets', 'aticos', 'locales', 'oficinas', 'naves', 'edificios'));

-- Update any existing records that might have invalid categories
UPDATE properties 
SET category = 'pisos' 
WHERE category NOT IN ('pisos', 'casas', 'chalets', 'aticos', 'locales', 'oficinas', 'naves', 'edificios');