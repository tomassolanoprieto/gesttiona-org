/*
  # Properties Database Schema

  1. New Tables
    - `properties`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `price` (numeric)
      - `location` (text)
      - `type` (text)
      - `category` (text)
      - `features` (jsonb)
      - `images` (text[])
      - `tags` (text[])
      - `featured` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `user_id` (uuid, foreign key)

  2. Security
    - Enable RLS on properties table
    - Add policies for CRUD operations
*/

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  price numeric NOT NULL,
  location text NOT NULL,
  type text NOT NULL CHECK (type IN ('venta', 'alquiler')),
  category text NOT NULL CHECK (category IN ('pisos', 'casas', 'chalets', 'aticos', 'locales', 'oficinas', 'naves', 'edificios')),
  features jsonb NOT NULL DEFAULT '{}'::jsonb,
  images text[] NOT NULL DEFAULT '{}',
  tags text[] NOT NULL DEFAULT '{}',
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view properties" 
  ON properties
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create properties" 
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own properties" 
  ON properties
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own properties" 
  ON properties
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX IF NOT EXISTS properties_type_idx ON properties(type);
CREATE INDEX IF NOT EXISTS properties_category_idx ON properties(category);
CREATE INDEX IF NOT EXISTS properties_location_idx ON properties(location);
CREATE INDEX IF NOT EXISTS properties_price_idx ON properties(price);
CREATE INDEX IF NOT EXISTS properties_featured_idx ON properties(featured);
CREATE INDEX IF NOT EXISTS properties_user_id_idx ON properties(user_id);