/*
  # Añadir campos de localización aproximada y piso

  1. Nuevos Campos
    - `approximate_location` (text): Localización aproximada del inmueble
    - `floor_number` (integer): Número de piso (1-10)
  
  2. Validaciones
    - Restricción para asegurar que floor_number esté entre 1 y 10
    - Campo approximate_location opcional
*/

-- Añadir nuevos campos a la tabla properties
ALTER TABLE properties
ADD COLUMN IF NOT EXISTS approximate_location text,
ADD COLUMN IF NOT EXISTS floor_number integer;

-- Añadir restricción para el número de piso
ALTER TABLE properties
ADD CONSTRAINT floor_number_range 
CHECK (floor_number IS NULL OR (floor_number >= 1 AND floor_number <= 10));