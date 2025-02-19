import type { Property } from '../../types/property';
import { API_URL } from '../constants/config';

export async function getProperties(): Promise<Property[]> {
  try {
    const response = await fetch(`${API_URL}/content/properties`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const properties = await response.json();
    
    return properties.map((property: any) => ({
      id: property.slug || property.id,
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      type: property.type,
      category: property.category,
      features: {
        bedrooms: property.features?.bedrooms || 0,
        bathrooms: property.features?.bathrooms || 0,
        size: property.features?.size || 0,
        parking: property.features?.parking || false,
        garden: property.features?.garden || false,
        pool: property.features?.pool || false,
        terrace: property.features?.terrace || false
      },
      images: property.images || [],
      tags: property.tags || [],
      featured: property.featured || false,
      createdAt: new Date(property.date || Date.now()),
      updatedAt: new Date(property.date || Date.now()),
    }));
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw new Error('Failed to fetch properties. Please try again later.');
  }
}