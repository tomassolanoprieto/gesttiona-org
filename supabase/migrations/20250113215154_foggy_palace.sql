/*
  # Añadir nuevas categorías de propiedades

  1. Cambios
    - Añadir 'obra-nueva' y 'garajes' como categorías válidas
    - Actualizar la restricción CHECK de la tabla properties
  
  2. Seguridad
    - Se mantienen las políticas RLS existentes
*/

-- Eliminar la restricción existente
ALTER TABLE properties 
  DROP CONSTRAINT IF EXISTS properties_category_check;

-- Crear nueva restricción con las categorías actualizadas
ALTER TABLE properties 
  ADD CONSTRAINT properties_category_check 
  CHECK (category IN ('pisos', 'casas', 'chalets', 'aticos', 'obra-nueva', 'locales', 'oficinas', 'naves', 'edificios', 'garajes'));