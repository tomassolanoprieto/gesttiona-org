import type { Property } from '../types/property';

export const featuredProperties: Property[] = [
  {
    id: '1',
    title: 'Villa de Lujo en La Eliana',
    price: 750000,
    location: 'La Eliana, Valencia',
    description: 'Espectacular villa con piscina y jardín',
    type: 'venta',
    category: 'chalets',
    features: {
      bedrooms: 5,
      bathrooms: 4,
      size: 450,
      pool: true,
      garden: true
    },
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'],
    tags: ['Piscina', 'Jardín', 'Garaje'],
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'Ático Moderno en Ciudad',
    price: 320000,
    location: 'Valencia Centro',
    description: 'Ático reformado con terraza panorámica',
    type: 'venta',
    category: 'aticos',
    features: {
      bedrooms: 3,
      bathrooms: 2,
      size: 120,
      terrace: true
    },
    images: ['https://images.unsplash.com/photo-1567496898669-ee935f5f647a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'],
    tags: ['Terraza', 'Reformado', 'Vistas'],
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    title: 'Chalet en Zona Residencial',
    price: 495000,
    location: 'Bétera, Valencia',
    description: 'Amplio chalet con zona deportiva',
    type: 'venta',
    category: 'chalets',
    features: {
      bedrooms: 4,
      bathrooms: 3,
      size: 300,
      pool: true,
      garden: true
    },
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'],
    tags: ['Piscina', 'Jardín', 'Zona deportiva'],
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];