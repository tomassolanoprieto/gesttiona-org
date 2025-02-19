import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';
import type { Property } from '../types/property';
import type { PropertyApiError } from '../lib/api/properties/types';
import { createPropertyError } from '../lib/api/properties/errors';

export function useProperty(id: string) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PropertyApiError | null>(null);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: supabaseError } = await supabase
          .from('properties')
          .select('*')
          .eq('id', id)
          .single();

        if (supabaseError) {
          throw createPropertyError('FETCH_ERROR');
        }

        if (!data) {
          throw createPropertyError('NOT_FOUND');
        }

        setProperty({
          id: data.id,
          title: data.title,
          description: data.description,
          price: Number(data.price),
          location: data.location,
          approximate_location: data.approximate_location,
          floor_number: data.floor_number,
          type: data.type,
          category: data.category,
          features: {
            bedrooms: Number(data.features.bedrooms),
            bathrooms: Number(data.features.bathrooms),
            size: Number(data.features.size),
            parking: Boolean(data.features.parking),
            garden: Boolean(data.features.garden),
            pool: Boolean(data.features.pool),
            terrace: Boolean(data.features.terrace)
          },
          images: data.images || [],
          tags: data.tags || [],
          featured: Boolean(data.featured),
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at)
        });
      } catch (err) {
        console.error('Error loading property:', err);
        setError(err as PropertyApiError);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProperty();
    }
  }, [id]);

  return { property, loading, error };
}