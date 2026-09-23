-- Row Level Security policies for trips table
-- Users can only view, insert, update, and delete their own trips

CREATE POLICY "Users can view their own trips" ON trips
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own trips" ON trips
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own trips" ON trips
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own trips" ON trips
FOR DELETE USING (auth.uid() = user_id);