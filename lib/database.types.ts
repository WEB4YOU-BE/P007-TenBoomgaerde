import {PostgrestError} from "@supabase/supabase-js";

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
      categories: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          categorie_id: string | null
          for_sale: boolean | null
          id: string
          name: string
          price: number | null
        }
        Insert: {
          categorie_id?: string | null
          for_sale?: boolean | null
          id?: string
          name: string
          price?: number | null
        }
        Update: {
          categorie_id?: string | null
          for_sale?: boolean | null
          id?: string
          name?: string
          price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_categorie_id_fkey"
            columns: ["categorie_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
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

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
// etc.


export type DbResult<T> = T extends PromiseLike<infer U> ? U : never
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never
export type DbResultErr = PostgrestError
