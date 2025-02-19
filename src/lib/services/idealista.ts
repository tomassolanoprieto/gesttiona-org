import type { Property } from '../../types/property';

const IDEALISTA_API_URL = process.env.IDEALISTA_API_URL;
const IDEALISTA_API_KEY = process.env.IDEALISTA_API_KEY;
const IDEALISTA_SECRET = process.env.IDEALISTA_SECRET;

interface IdealistaProperty {
  propertyCode: string;
  title: string;
  price: number;
  address: string;
  description: string;
  size: number;
  rooms: number;
  bathrooms: number;
  hasParking: boolean;
  hasGarden: boolean;
  hasPool: boolean;
  hasTerrace: boolean;
  propertyType: string;
  operation: string;
  photos: string[];
  features: string[];
}

export async function getAuthToken(): Promise<string> {
  const credentials = Buffer.from(`${IDEALISTA_API_KEY}:${IDEALISTA_SECRET}`).toString('base64');
  
  const response = await fetch(`${IDEALISTA_API_URL}/oauth/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();
  return data.access_token;
}

export async function fetchIdealistaProperties(): Promise<Property[]> {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${IDEALISTA_API_URL}/3.5/es/properties`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch properties from Idealista');
    }

    const data = await response.json();
    return transformIdealistaProperties(data.elementList);
  } catch (error) {
    console.error('Error fetching properties from Idealista:', error);
    throw error;
  }
}

function transformIdealistaProperties(idealistaProperties: IdealistaProperty[]): Property[] {
  return idealistaProperties.map(prop => ({
    id: prop.propertyCode,
    title: prop.title,
    description: prop.description,
    price: prop.price,
    location: prop.address,
    type: prop.operation === 'sale' ? 'venta' : 'alquiler',
    category: mapPropertyType(prop.propertyType),
    features: {
      bedrooms: prop.rooms,
      bathrooms: prop.bathrooms,
      size: prop.size,
      parking: prop.hasParking,
      garden: prop.hasGarden,
      pool: prop.hasPool,
      terrace: prop.hasTerrace
    },
    images: prop.photos,
    tags: prop.features,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }));
}

function mapPropertyType(idealistaType: string): Property['category'] {
  const typeMap: Record<string, Property['category']> = {
    'flat': 'pisos',
    'chalet': 'chalets',
    'penthouse': 'aticos',
    'house': 'casas',
    'office': 'oficinas',
    'commercial': 'locales',
    'industrial': 'naves',
    'building': 'edificios'
  };

  return typeMap[idealistaType] || 'pisos';
}