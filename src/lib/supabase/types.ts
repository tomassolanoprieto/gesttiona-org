export type Database = {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string;
          title: string;
          description: string;
          price: number;
          location: string;
          type: 'venta' | 'alquiler';
          category: 'pisos' | 'casas' | 'chalets' | 'aticos' | 'locales' | 'oficinas' | 'naves' | 'edificios';
          features: {
            bedrooms: number;
            bathrooms: number;
            size: number;
            parking?: boolean;
            garden?: boolean;
            pool?: boolean;
            terrace?: boolean;
          };
          images: string[];
          tags: string[];
          featured: boolean;
          created_at: string;
          updated_at: string;
          user_id: string | null;
        };
        Insert: Omit<Database['public']['Tables']['properties']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['properties']['Insert']>;
      };
    };
  };
};