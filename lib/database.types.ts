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
      bloks: {
        Row: {
          end_hour: string
          id: string
          name: string
          start_hour: string
        }
        Insert: {
          end_hour: string
          id?: string
          name: string
          start_hour: string
        }
        Update: {
          end_hour?: string
          id?: string
          name?: string
          start_hour?: string
        }
        Relationships: []
      }
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
      organizations: {
        Row: {
          btw_number: string
          id: string
          name: string
        }
        Insert: {
          btw_number: string
          id?: string
          name: string
        }
        Update: {
          btw_number?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          categories: any
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
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      reservations: {
        Row: {
          access_code: number | null
          end_date: string
          end_hour: any
          gefactureerd: boolean
          id: string
          organizations: any
          products: any
          reservation_number: number
          reservation_year: string
          rooms: any
          start_date: string
          start_hour: any
          status: string | null
          users: any
        }
        Insert: {
          access_code?: number | null
          end_date?: string | null
          end_hour?: string | null
          gefactureerd?: boolean
          id?: string
          organizations_id?: string | null
          product_id?: string | null
          reservation_number: number
          reservation_year: string
          room_id?: string | null
          start_date?: string | null
          start_hour?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          access_code?: number | null
          end_date?: string | null
          end_hour?: string | null
          gefactureerd?: boolean
          id?: string
          organizations_id?: string | null
          product_id?: string | null
          reservation_number?: number
          reservation_year?: string
          room_id?: string | null
          start_date?: string | null
          start_hour?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reservations_end_hour_fkey"
            columns: ["end_hour"]
            isOneToOne: false
            referencedRelation: "bloks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_organizations_id_fkey"
            columns: ["organizations_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_start_hour_fkey"
            columns: ["start_hour"]
            isOneToOne: false
            referencedRelation: "bloks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
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
          city: string | null
          email: string
          firstname: string | null
          id: string
          is_admin: boolean
          lastname: string | null
          phone: string | null
          postcode: string | null
          street: string | null
        }
        Insert: {
          city?: string | null
          email: string
          firstname?: string | null
          id: string
          is_admin?: boolean
          lastname?: string | null
          phone?: string | null
          postcode?: string | null
          street?: string | null
        }
        Update: {
          city?: string | null
          email?: string
          firstname?: string | null
          id?: string
          is_admin?: boolean
          lastname?: string | null
          phone?: string | null
          postcode?: string | null
          street?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
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
      is_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
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
export type Functions<T extends keyof Database['public']['Functions']> = Database['public']['Functions'][T]
// etc.


export type DbResult<T> = T extends PromiseLike<infer U> ? U : never
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never
export type DbResultErr = PostgrestError