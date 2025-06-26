/* eslint-disable @typescript-eslint/no-redundant-type-constituents */

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
        | keyof DefaultSchema["CompositeTypes"]
        | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
        : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
      ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
      : never;
export type Database = {
    graphql_public: {
        CompositeTypes: { [_ in never]: never };
        Enums: { [_ in never]: never };
        Functions: {
            graphql: {
                Args: {
                    extensions?: Json;
                    operationName?: string;
                    query?: string;
                    variables?: Json;
                };
                Returns: Json;
            };
        };
        Tables: { [_ in never]: never };
        Views: { [_ in never]: never };
    };
    public: {
        CompositeTypes: { [_ in never]: never };
        Enums: { [_ in never]: never };
        Functions: {
            is_admin: { Args: { user_id: string }; Returns: boolean };
        };
        Tables: {
            categories: {
                Insert: { id?: string; name: string };
                Relationships: [];
                Row: { id: string; name: string };
                Update: { id?: string; name?: string };
            };
            halls: {
                Insert: {
                    id?: string;
                    is_private?: boolean;
                    name: string;
                    price_per_day?: null | number;
                    price_per_day_discount?: null | number;
                };
                Relationships: [];
                Row: {
                    id: string;
                    is_private: boolean;
                    name: string;
                    price_per_day: null | number;
                    price_per_day_discount: null | number;
                };
                Update: {
                    id?: string;
                    is_private?: boolean;
                    name?: string;
                    price_per_day?: null | number;
                    price_per_day_discount?: null | number;
                };
            };
            organizations: {
                Insert: { btw_number: string; id?: string; name: string };
                Relationships: [];
                Row: { btw_number: string; id: string; name: string };
                Update: { btw_number?: string; id?: string; name?: string };
            };
            products: {
                Insert: {
                    categorie_id?: null | string;
                    for_sale?: boolean | null;
                    id?: string;
                    name: string;
                    price?: null | number;
                };
                Relationships: [
                    {
                        columns: ["categorie_id"];
                        foreignKeyName: "products_categorie_id_fkey";
                        isOneToOne: false;
                        referencedColumns: ["id"];
                        referencedRelation: "categories";
                    },
                ];
                Row: {
                    categorie_id: null | string;
                    for_sale: boolean | null;
                    id: string;
                    name: string;
                    price: null | number;
                };
                Update: {
                    categorie_id?: null | string;
                    for_sale?: boolean | null;
                    id?: string;
                    name?: string;
                    price?: null | number;
                };
            };
            reservation_halls: {
                Insert: { hall_id: string; reservation_id: string };
                Relationships: [
                    {
                        columns: ["hall_id"];
                        foreignKeyName: "reservation_halls_hall_id_fkey";
                        isOneToOne: false;
                        referencedColumns: ["id"];
                        referencedRelation: "halls";
                    },
                    {
                        columns: ["reservation_id"];
                        foreignKeyName: "reservation_halls_reservation_id_fkey";
                        isOneToOne: false;
                        referencedColumns: ["id"];
                        referencedRelation: "reservations";
                    },
                ];
                Row: { hall_id: string; reservation_id: string };
                Update: { hall_id?: string; reservation_id?: string };
            };
            reservations: {
                Insert: {
                    access_code?: null | number;
                    end?: null | string;
                    gefactureerd?: boolean | null;
                    id?: string;
                    organizations_id?: null | string;
                    product_id?: null | string;
                    remarks?: null | string;
                    reservation_number: number;
                    reservation_year: string;
                    start?: null | string;
                    status?: null | string;
                    user_id?: null | string;
                };
                Relationships: [
                    {
                        columns: ["organizations_id"];
                        foreignKeyName: "reservations_organizations_id_fkey";
                        isOneToOne: false;
                        referencedColumns: ["id"];
                        referencedRelation: "organizations";
                    },
                    {
                        columns: ["product_id"];
                        foreignKeyName: "reservations_product_id_fkey";
                        isOneToOne: false;
                        referencedColumns: ["id"];
                        referencedRelation: "products";
                    },
                    {
                        columns: ["user_id"];
                        foreignKeyName: "reservations_user_id_fkey";
                        isOneToOne: false;
                        referencedColumns: ["id"];
                        referencedRelation: "users";
                    },
                ];
                Row: {
                    access_code: null | number;
                    end: null | string;
                    gefactureerd: boolean | null;
                    id: string;
                    organizations_id: null | string;
                    product_id: null | string;
                    remarks: null | string;
                    reservation_number: number;
                    reservation_year: string;
                    start: null | string;
                    status: null | string;
                    user_id: null | string;
                };
                Update: {
                    access_code?: null | number;
                    end?: null | string;
                    gefactureerd?: boolean | null;
                    id?: string;
                    organizations_id?: null | string;
                    product_id?: null | string;
                    remarks?: null | string;
                    reservation_number?: number;
                    reservation_year?: string;
                    start?: null | string;
                    status?: null | string;
                    user_id?: null | string;
                };
            };
            timeslots: {
                Insert: {
                    end_time: string;
                    id?: string;
                    name: string;
                    start_time: string;
                };
                Relationships: [];
                Row: {
                    end_time: string;
                    id: string;
                    name: string;
                    start_time: string;
                };
                Update: {
                    end_time?: string;
                    id?: string;
                    name?: string;
                    start_time?: string;
                };
            };
            users: {
                Insert: {
                    address_city?: null | string;
                    address_number?: null | string;
                    address_postal_code?: null | string;
                    address_street?: null | string;
                    email: string;
                    firstname?: null | string;
                    id: string;
                    is_admin?: boolean;
                    lastname?: null | string;
                    phone?: null | string;
                    type?: number;
                };
                Relationships: [];
                Row: {
                    address_city: null | string;
                    address_number: null | string;
                    address_postal_code: null | string;
                    address_street: null | string;
                    email: string;
                    firstname: null | string;
                    id: string;
                    is_admin: boolean;
                    lastname: null | string;
                    phone: null | string;
                    type: number;
                };
                Update: {
                    address_city?: null | string;
                    address_number?: null | string;
                    address_postal_code?: null | string;
                    address_street?: null | string;
                    email?: string;
                    firstname?: null | string;
                    id?: string;
                    is_admin?: boolean;
                    lastname?: null | string;
                    phone?: null | string;
                    type?: number;
                };
            };
        };
        Views: { [_ in never]: never };
    };
    storage: {
        CompositeTypes: { [_ in never]: never };
        Enums: { [_ in never]: never };
        Functions: {
            add_prefixes: {
                Args: { _bucket_id: string; _name: string };
                Returns: undefined;
            };
            can_insert_object: {
                Args: {
                    bucketid: string;
                    metadata: Json;
                    name: string;
                    owner: string;
                };
                Returns: undefined;
            };
            delete_prefix: {
                Args: { _bucket_id: string; _name: string };
                Returns: boolean;
            };
            extension: { Args: { name: string }; Returns: string };
            filename: { Args: { name: string }; Returns: string };
            foldername: { Args: { name: string }; Returns: string[] };
            get_level: { Args: { name: string }; Returns: number };
            get_prefix: { Args: { name: string }; Returns: string };
            get_prefixes: { Args: { name: string }; Returns: string[] };
            get_size_by_bucket: {
                Args: Record<PropertyKey, never>;
                Returns: { bucket_id: string; size: number }[];
            };
            list_multipart_uploads_with_delimiter: {
                Args: {
                    bucket_id: string;
                    delimiter_param: string;
                    max_keys?: number;
                    next_key_token?: string;
                    next_upload_token?: string;
                    prefix_param: string;
                };
                Returns: { created_at: string; id: string; key: string }[];
            };
            list_objects_with_delimiter: {
                Args: {
                    bucket_id: string;
                    delimiter_param: string;
                    max_keys?: number;
                    next_token?: string;
                    prefix_param: string;
                    start_after?: string;
                };
                Returns: {
                    id: string;
                    metadata: Json;
                    name: string;
                    updated_at: string;
                }[];
            };
            operation: { Args: Record<PropertyKey, never>; Returns: string };
            search: {
                Args: {
                    bucketname: string;
                    levels?: number;
                    limits?: number;
                    offsets?: number;
                    prefix: string;
                    search?: string;
                    sortcolumn?: string;
                    sortorder?: string;
                };
                Returns: {
                    created_at: string;
                    id: string;
                    last_accessed_at: string;
                    metadata: Json;
                    name: string;
                    updated_at: string;
                }[];
            };
            search_legacy_v1: {
                Args: {
                    bucketname: string;
                    levels?: number;
                    limits?: number;
                    offsets?: number;
                    prefix: string;
                    search?: string;
                    sortcolumn?: string;
                    sortorder?: string;
                };
                Returns: {
                    created_at: string;
                    id: string;
                    last_accessed_at: string;
                    metadata: Json;
                    name: string;
                    updated_at: string;
                }[];
            };
            search_v1_optimised: {
                Args: {
                    bucketname: string;
                    levels?: number;
                    limits?: number;
                    offsets?: number;
                    prefix: string;
                    search?: string;
                    sortcolumn?: string;
                    sortorder?: string;
                };
                Returns: {
                    created_at: string;
                    id: string;
                    last_accessed_at: string;
                    metadata: Json;
                    name: string;
                    updated_at: string;
                }[];
            };
            search_v2: {
                Args: {
                    bucket_name: string;
                    levels?: number;
                    limits?: number;
                    prefix: string;
                    start_after?: string;
                };
                Returns: {
                    created_at: string;
                    id: string;
                    key: string;
                    metadata: Json;
                    name: string;
                    updated_at: string;
                }[];
            };
        };
        Tables: {
            buckets: {
                Insert: {
                    allowed_mime_types?: null | string[];
                    avif_autodetection?: boolean | null;
                    created_at?: null | string;
                    file_size_limit?: null | number;
                    id: string;
                    name: string;
                    owner?: null | string;
                    owner_id?: null | string;
                    public?: boolean | null;
                    updated_at?: null | string;
                };
                Relationships: [];
                Row: {
                    allowed_mime_types: null | string[];
                    avif_autodetection: boolean | null;
                    created_at: null | string;
                    file_size_limit: null | number;
                    id: string;
                    name: string;
                    owner: null | string;
                    owner_id: null | string;
                    public: boolean | null;
                    updated_at: null | string;
                };
                Update: {
                    allowed_mime_types?: null | string[];
                    avif_autodetection?: boolean | null;
                    created_at?: null | string;
                    file_size_limit?: null | number;
                    id?: string;
                    name?: string;
                    owner?: null | string;
                    owner_id?: null | string;
                    public?: boolean | null;
                    updated_at?: null | string;
                };
            };
            migrations: {
                Insert: {
                    executed_at?: null | string;
                    hash: string;
                    id: number;
                    name: string;
                };
                Relationships: [];
                Row: {
                    executed_at: null | string;
                    hash: string;
                    id: number;
                    name: string;
                };
                Update: {
                    executed_at?: null | string;
                    hash?: string;
                    id?: number;
                    name?: string;
                };
            };
            objects: {
                Insert: {
                    bucket_id?: null | string;
                    created_at?: null | string;
                    id?: string;
                    last_accessed_at?: null | string;
                    level?: null | number;
                    metadata?: Json | null;
                    name?: null | string;
                    owner?: null | string;
                    owner_id?: null | string;
                    path_tokens?: null | string[];
                    updated_at?: null | string;
                    user_metadata?: Json | null;
                    version?: null | string;
                };
                Relationships: [
                    {
                        columns: ["bucket_id"];
                        foreignKeyName: "objects_bucketId_fkey";
                        isOneToOne: false;
                        referencedColumns: ["id"];
                        referencedRelation: "buckets";
                    },
                ];
                Row: {
                    bucket_id: null | string;
                    created_at: null | string;
                    id: string;
                    last_accessed_at: null | string;
                    level: null | number;
                    metadata: Json | null;
                    name: null | string;
                    owner: null | string;
                    owner_id: null | string;
                    path_tokens: null | string[];
                    updated_at: null | string;
                    user_metadata: Json | null;
                    version: null | string;
                };
                Update: {
                    bucket_id?: null | string;
                    created_at?: null | string;
                    id?: string;
                    last_accessed_at?: null | string;
                    level?: null | number;
                    metadata?: Json | null;
                    name?: null | string;
                    owner?: null | string;
                    owner_id?: null | string;
                    path_tokens?: null | string[];
                    updated_at?: null | string;
                    user_metadata?: Json | null;
                    version?: null | string;
                };
            };
            prefixes: {
                Insert: {
                    bucket_id: string;
                    created_at?: null | string;
                    level?: number;
                    name: string;
                    updated_at?: null | string;
                };
                Relationships: [
                    {
                        columns: ["bucket_id"];
                        foreignKeyName: "prefixes_bucketId_fkey";
                        isOneToOne: false;
                        referencedColumns: ["id"];
                        referencedRelation: "buckets";
                    },
                ];
                Row: {
                    bucket_id: string;
                    created_at: null | string;
                    level: number;
                    name: string;
                    updated_at: null | string;
                };
                Update: {
                    bucket_id?: string;
                    created_at?: null | string;
                    level?: number;
                    name?: string;
                    updated_at?: null | string;
                };
            };
            s3_multipart_uploads: {
                Insert: {
                    bucket_id: string;
                    created_at?: string;
                    id: string;
                    in_progress_size?: number;
                    key: string;
                    owner_id?: null | string;
                    upload_signature: string;
                    user_metadata?: Json | null;
                    version: string;
                };
                Relationships: [
                    {
                        columns: ["bucket_id"];
                        foreignKeyName: "s3_multipart_uploads_bucket_id_fkey";
                        isOneToOne: false;
                        referencedColumns: ["id"];
                        referencedRelation: "buckets";
                    },
                ];
                Row: {
                    bucket_id: string;
                    created_at: string;
                    id: string;
                    in_progress_size: number;
                    key: string;
                    owner_id: null | string;
                    upload_signature: string;
                    user_metadata: Json | null;
                    version: string;
                };
                Update: {
                    bucket_id?: string;
                    created_at?: string;
                    id?: string;
                    in_progress_size?: number;
                    key?: string;
                    owner_id?: null | string;
                    upload_signature?: string;
                    user_metadata?: Json | null;
                    version?: string;
                };
            };
            s3_multipart_uploads_parts: {
                Insert: {
                    bucket_id: string;
                    created_at?: string;
                    etag: string;
                    id?: string;
                    key: string;
                    owner_id?: null | string;
                    part_number: number;
                    size?: number;
                    upload_id: string;
                    version: string;
                };
                Relationships: [
                    {
                        columns: ["bucket_id"];
                        foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey";
                        isOneToOne: false;
                        referencedColumns: ["id"];
                        referencedRelation: "buckets";
                    },
                    {
                        columns: ["upload_id"];
                        foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey";
                        isOneToOne: false;
                        referencedColumns: ["id"];
                        referencedRelation: "s3_multipart_uploads";
                    },
                ];
                Row: {
                    bucket_id: string;
                    created_at: string;
                    etag: string;
                    id: string;
                    key: string;
                    owner_id: null | string;
                    part_number: number;
                    size: number;
                    upload_id: string;
                    version: string;
                };
                Update: {
                    bucket_id?: string;
                    created_at?: string;
                    etag?: string;
                    id?: string;
                    key?: string;
                    owner_id?: null | string;
                    part_number?: number;
                    size?: number;
                    upload_id?: string;
                    version?: string;
                };
            };
        };
        Views: { [_ in never]: never };
    };
};
export type Enums<
    DefaultSchemaEnumNameOrOptions extends
        | keyof DefaultSchema["Enums"]
        | { schema: keyof Database },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
        : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
    ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
      ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
      : never;
export type Json =
    | boolean
    | Json[]
    | null
    | number
    | string
    | { [key: string]: Json | undefined };
export type Tables<
    DefaultSchemaTableNameOrOptions extends
        | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
        | { schema: keyof Database },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
              Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
        : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
    ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
          Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
            DefaultSchema["Views"])
      ? (DefaultSchema["Tables"] &
            DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
            Row: infer R;
        }
          ? R
          : never
      : never;
export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends
        | keyof DefaultSchema["Tables"]
        | { schema: keyof Database },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
    ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
      ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
            Insert: infer I;
        }
          ? I
          : never
      : never;
export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends
        | keyof DefaultSchema["Tables"]
        | { schema: keyof Database },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
    ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
      ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
            Update: infer U;
        }
          ? U
          : never
      : never;
type DefaultSchema = Database[Extract<keyof Database, "public">];
export const Constants = {
    graphql_public: { Enums: {} },
    public: { Enums: {} },
    storage: { Enums: {} },
} as const;
