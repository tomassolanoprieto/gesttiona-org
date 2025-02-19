-- Eliminar las políticas existentes
DROP POLICY IF EXISTS "Users can update their own properties" ON properties;
DROP POLICY IF EXISTS "Authenticated users can create properties" ON properties;

-- Crear nuevas políticas más permisivas
CREATE POLICY "Anyone can update properties"
ON properties
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

CREATE POLICY "Anyone can create properties"
ON properties
FOR INSERT
TO public
WITH CHECK (true);

-- Asegurarse de que el trigger de updated_at funciona correctamente
DROP TRIGGER IF EXISTS update_properties_updated_at ON properties;
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();