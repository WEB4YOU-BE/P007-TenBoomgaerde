export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
  public: {
    Tables: {
      rooms: {
        Row: {
          day_price: number | null
          id: string
          name: string
          private: boolean
        }
        Insert: {
          day_price?: number | null
          id?: string
          name: string
          private?: boolean
        }
        Update: {
          day_price?: number | null
          id?: string
          name?: string
          private?: boolean
        }
        Relationships: []
      }
      users: {
        Row: {
          firstname: string | null
          id: string
          lastname: string | null
        }
        Insert: {
          firstname?: string | null
          id: string
          lastname?: string | null
        }
        Update: {
          firstname?: string | null
          id?: string
          lastname?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
