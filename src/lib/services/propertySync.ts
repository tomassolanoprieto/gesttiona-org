import { fetchIdealistaProperties } from './idealista';
import type { Property } from '../../types/property';
import { API_URL } from '../constants/config';

export async function syncProperties(): Promise<void> {
  try {
    // Fetch properties from Idealista
    const idealistaProperties = await fetchIdealistaProperties();
    
    // Send properties to your API
    await updateProperties(idealistaProperties);
    
    console.log('Properties synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing properties:', error);
    throw error;
  }
}

async function updateProperties(properties: Property[]): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/api/properties/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties })
    });

    if (!response.ok) {
      throw new Error('Failed to update properties');
    }
  } catch (error) {
    console.error('Error updating properties:', error);
    throw error;
  }
}