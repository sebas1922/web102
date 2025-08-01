-- Supabase RLS Policies for Heroes Table
-- Run these commands in your Supabase SQL Editor

-- 1. Allow anyone to read heroes (for the homepage)
CREATE POLICY "Allow public read access on heroes" 
ON heroes 
FOR SELECT 
USING (true);

-- 2. Allow anyone to insert heroes (for creating new heroes)
CREATE POLICY "Allow public insert access on heroes" 
ON heroes 
FOR INSERT 
WITH CHECK (true);

-- 3. Allow anyone to update heroes (for future edit functionality)
CREATE POLICY "Allow public update access on heroes" 
ON heroes 
FOR UPDATE 
USING (true) 
WITH CHECK (true);

-- 4. Allow anyone to delete heroes (for future delete functionality)
CREATE POLICY "Allow public delete access on heroes" 
ON heroes 
FOR DELETE 
USING (true);

-- Alternative: If you want to see the current RLS status
-- SELECT * FROM pg_policies WHERE tablename = 'heroes';