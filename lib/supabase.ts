import { createClient } from '@supabase/supabase-js'
import { type SupabaseClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

// Helper types for our database
export type Database = {
  public: {
    Tables: {
      trips: {
        Row: {
          id: string
          user_id: string
          destination: string
          days: number
          budget: string
          pace: string
          interests: string[]
          itinerary_data: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          destination: string
          days: number
          budget: string
          pace: string
          interests: string[]
          itinerary_data: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          destination?: string
          days?: number
          budget?: string
          pace?: string
          interests?: string[]
          itinerary_data?: Json
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trips_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedTable: "auth.users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

// Trip type for our application
export type Trip = Database['public']['Tables']['trips']['Row']
export type TripInsert = Database['public']['Tables']['trips']['Insert']
export type TripUpdate = Database['public']['Tables']['trips']['Update']