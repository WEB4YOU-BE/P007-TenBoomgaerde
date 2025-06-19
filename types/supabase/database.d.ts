/* eslint-disable */

export type Database = {
    graphql_public: {
        CompositeTypes: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
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
        Tables: {
            [_ in never]: never;
        };
        Views: {
            [_ in never]: never;
        };
    };
    public: {
        CompositeTypes: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        Functions: {
            is_admin: {
                Args: {
                    user_id: string;
                };
                Returns: boolean;
            };
        };
        Tables: {
            bloks: {
                Insert: {
                    end_hour: string;
                    id?: string;
                    name: string;
                    start_hour: string;
                };
                Relationships: [];
                Row: {
                    end_hour: string;
                    id: string;
                    name: string;
                    start_hour: string;
                };
                Update: {
                    end_hour?: string;
                    id?: string;
                    name?: string;
                    start_hour?: string;
                };
            };
            categories: {
                Insert: {
                    id?: string;
                    name: string;
                };
                Relationships: [];
                Row: {
                    id: string;
                    name: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                };
            };
            organizations: {
                Insert: {
                    btw_number: string;
                    id?: string;
                    name: string;
                };
                Relationships: [];
                Row: {
                    btw_number: string;
                    id: string;
                    name: string;
                };
                Update: {
                    btw_number?: string;
                    id?: string;
                    name?: string;
                };
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
            reservations: {
                Insert: {
                    access_code?: null | number;
                    end_date?: null | string;
                    end_hour?: null | string;
                    gefactureerd?: boolean | null;
                    id?: string;
                    organizations_id?: null | string;
                    product_id?: null | string;
                    remarks?: null | string;
                    reservation_number: number;
                    reservation_year: string;
                    room_id?: null | string;
                    start_date?: null | string;
                    start_hour?: null | string;
                    status?: null | string;
                    user_id?: null | string;
                };
                Relationships: [
                    {
                        columns: ["end_hour"];
                        foreignKeyName: "reservations_end_hour_fkey";
                        isOneToOne: false;
                        referencedColumns: ["id"];
                        referencedRelation: "bloks";
                    },
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
                        columns: ["room_id"];
                        foreignKeyName: "reservations_room_id_fkey";
                        isOneToOne: false;
                        referencedColumns: ["id"];
                        referencedRelation: "rooms";
                    },
                    {
                        columns: ["start_hour"];
                        foreignKeyName: "reservations_start_hour_fkey";
                        isOneToOne: false;
                        referencedColumns: ["id"];
                        referencedRelation: "bloks";
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
                    end_date: null | string;
                    end_hour: null | string;
                    gefactureerd: boolean | null;
                    id: string;
                    organizations_id: null | string;
                    product_id: null | string;
                    remarks: null | string;
                    reservation_number: number;
                    reservation_year: string;
                    room_id: null | string;
                    start_date: null | string;
                    start_hour: null | string;
                    status: null | string;
                    user_id: null | string;
                };
                Update: {
                    access_code?: null | number;
                    end_date?: null | string;
                    end_hour?: null | string;
                    gefactureerd?: boolean | null;
                    id?: string;
                    organizations_id?: null | string;
                    product_id?: null | string;
                    remarks?: null | string;
                    reservation_number?: number;
                    reservation_year?: string;
                    room_id?: null | string;
                    start_date?: null | string;
                    start_hour?: null | string;
                    status?: null | string;
                    user_id?: null | string;
                };
            };
            rooms: {
                Insert: {
                    day_price?: null | number;
                    day_price2?: null | number;
                    id?: string;
                    name: string;
                    private?: boolean;
                };
                Relationships: [];
                Row: {
                    day_price: null | number;
                    day_price2: null | number;
                    id: string;
                    name: string;
                    private: boolean;
                };
                Update: {
                    day_price?: null | number;
                    day_price2?: null | number;
                    id?: string;
                    name?: string;
                    private?: boolean;
                };
            };
            users: {
                Insert: {
                    city?: null | string;
                    email: string;
                    firstname?: null | string;
                    id: string;
                    is_admin?: boolean;
                    lastname?: null | string;
                    phone?: null | string;
                    postcode?: null | string;
                    street?: null | string;
                    type?: number;
                };
                Relationships: [
                    {
                        columns: ["id"];
                        foreignKeyName: "users_id_fkey";
                        isOneToOne: true;
                        referencedColumns: ["id"];
                        referencedRelation: "users";
                    },
                ];
                Row: {
                    city: null | string;
                    email: string;
                    firstname: null | string;
                    id: string;
                    is_admin: boolean;
                    lastname: null | string;
                    phone: null | string;
                    postcode: null | string;
                    street: null | string;
                    type: number;
                };
                Update: {
                    city?: null | string;
                    email?: string;
                    firstname?: null | string;
                    id?: string;
                    is_admin?: boolean;
                    lastname?: null | string;
                    phone?: null | string;
                    postcode?: null | string;
                    street?: null | string;
                    type?: number;
                };
            };
        };
        Views: {
            [_ in never]: never;
        };
    };
    storage: {
        CompositeTypes: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        Functions: {
            can_insert_object: {
                Args: {
                    bucketid: string;
                    metadata: Json;
                    name: string;
                    owner: string;
                };
                Returns: undefined;
            };
            extension: {
                Args: {
                    name: string;
                };
                Returns: string;
            };
            filename: {
                Args: {
                    name: string;
                };
                Returns: string;
            };
            foldername: {
                Args: {
                    name: string;
                };
                Returns: string[];
            };
            get_size_by_bucket: {
                Args: Record<PropertyKey, never>;
                Returns: {
                    bucket_id: string;
                    size: number;
                }[];
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
                Returns: {
                    created_at: string;
                    id: string;
                    key: string;
                }[];
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
            operation: {
                Args: Record<PropertyKey, never>;
                Returns: string;
            };
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
        Views: {
            [_ in never]: never;
        };
    };
};

export type Enums<
    PublicEnumNameOrOptions extends
        | keyof PublicSchema["Enums"]
        | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
      ? PublicSchema["Enums"][PublicEnumNameOrOptions]
      : never;

export type Json =
    | boolean
    | Json[]
    | null
    | number
    | string
    | { [key: string]: Json | undefined };

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
              Database[PublicTableNameOrOptions["schema"]]["Views"])
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
          Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
            PublicSchema["Views"])
      ? (PublicSchema["Tables"] &
            PublicSchema["Views"])[PublicTableNameOrOptions] extends {
            Row: infer R;
        }
          ? R
          : never
      : never;

export type TablesInsert<
    PublicTableNameOrOptions extends
        | keyof PublicSchema["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
      ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
            Insert: infer I;
        }
          ? I
          : never
      : never;

export type TablesUpdate<
    PublicTableNameOrOptions extends
        | keyof PublicSchema["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
      ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
            Update: infer U;
        }
          ? U
          : never
      : never;

type PublicSchema = Database[Extract<keyof Database, "public">];
