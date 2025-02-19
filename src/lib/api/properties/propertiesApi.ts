import { supabase } from '../../supabase/client';
import type { Property } from '../../../types/property';
import type { PropertyApiError } from './types';
import { createPropertyError } from './errors';

export async function getProperties(): Promise<Property[]> {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error);
      throw createPropertyError('FETCH_ERROR');
    }

    return data.map(transformProperty);
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw createPropertyError('UNKNOWN_ERROR');
  }
}

export async function createProperty(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> {
  try {
    const { data, error } = await supabase
      .from('properties')
      .insert([property])
      .select()
      .single();

    if (error) {
      console.error('Supabase create error:', error);
      throw createPropertyError('CREATE_ERROR');
    }

    return transformProperty(data);
  } catch (error) {
    console.error('Error creating property:', error);
    throw createPropertyError('UNKNOWN_ERROR');
  }
}

export async function updateProperty(id: string, property: Partial<Property>): Promise<Property> {
  try {
    const { data, error } = await supabase
      .from('properties')
      .update(property)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase update error:', error);
      throw createPropertyError('UPDATE_ERROR');
    }

    return transformProperty(data);
  } catch (error) {
    console.error('Error updating property:', error);
    throw createPropertyError('UNKNOWN_ERROR');
  }
}

export async function deleteProperty(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase delete error:', error);
      throw createPropertyError('DELETE_ERROR');
    }
  } catch (error) {
    console.error('Error deleting property:', error);
    throw createPropertyError('DELETE_ERROR');
  }
}

function transformProperty(data: any): Property {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    price: Number(data.price),
    location: data.location,
    approximate_location: data.approximate_location,
    floor_number: data.floor_number ? Number(data.floor_number) : undefined,
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
  };
}