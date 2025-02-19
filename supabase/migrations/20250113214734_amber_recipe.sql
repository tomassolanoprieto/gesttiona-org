/*
  # Sincronizar categorías de propiedades

  1. Cambios
    - Actualiza la restricción de categorías para que coincida exactamente con el frontend
    - Limpia cualquier dato existente que no cumpla con las nuevas categorías
    - Asegura consistencia entre frontend y backend

  2. Seguridad
    - Mantiene las políticas RLS existentes
*/

-- Eliminar la restricción existente
ALTER TABLE properties 
  DROP CONSTRAINT IF EXISTS properties_category_check;

-- Crear nueva restricción con las categorías exactas
ALTER TABLE properties 
  ADD CONSTRAINT properties_category_check 
  CHECK (category IN ('pisos', 'casas', 'chalets', 'aticos', 'locales', 'oficinas', 'naves', 'edificios'));

-- Actualizar registros existentes que tengan categorías inválidas
UPDATE properties 
SET category = 'pisos' 
WHERE category NOT IN ('pisos', 'casas', 'chalets', 'aticos', 'locales', 'oficinas', 'naves', 'edificios');