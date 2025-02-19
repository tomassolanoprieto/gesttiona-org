-- Eliminar la política de eliminación existente
DROP POLICY IF EXISTS "Users can delete their own properties" ON properties;

-- Crear una nueva política de eliminación más permisiva
CREATE POLICY "Anyone can delete properties"
ON properties
FOR DELETE
TO public
USING (true);

-- Asegurar que los triggers existentes no interfieren con la eliminación
DROP TRIGGER IF EXISTS validate_property_update_trigger ON properties;
DROP FUNCTION IF EXISTS validate_property_update();

-- Crear un trigger para registrar eliminaciones
CREATE OR REPLACE FUNCTION log_property_deletion()
RETURNS TRIGGER AS $$
BEGIN
  -- Aquí podrías agregar lógica para registrar la eliminación si lo necesitas
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER log_property_deletion_trigger
  BEFORE DELETE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION log_property_deletion();