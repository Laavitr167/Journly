-- SQL to create trips table for Journly app
CREATE TABLE trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  destination TEXT NOT NULL,
  days INTEGER NOT NULL,
  budget TEXT NOT NULL,
  pace TEXT NOT NULL,
  interests TEXT[] NOT NULL,
  itinerary_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (we'll add policies in the next step)
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;