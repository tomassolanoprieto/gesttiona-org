import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProperties } from '../lib/api/properties/propertiesApi';
import type { Property } from '../types/property';
import type { PropertyApiError } from '../lib/api/properties/types';
import { VALENCIA_LOCATIONS } from '../lib/constants/locations';

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PropertyApiError | null>(null);
  const [searchParams] = useSearchParams();

  const loadProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProperties();
      
      // Aplicar filtros
      let filteredData = [...data];
      
      const location = searchParams.get('location');
      const type = searchParams.get('type');
      const operation = searchParams.get('operation');
      const minPrice = searchParams.get('minPrice');
      const maxPrice = searchParams.get('maxPrice');

      // Filtrar por ubicación
      if (location && location !== '') {
        if (location === 'otras') {
          // Si es "otras", filtrar las ubicaciones que no están en la lista principal
          const mainLocations = VALENCIA_LOCATIONS.map(loc => loc.value.toLowerCase());
          filteredData = filteredData.filter(property => 
            !mainLocations.includes(property.location.toLowerCase()) || 
            property.location.toLowerCase() === 'otras'
          );
        } else {
          // Filtrado normal por ubicación específica
          filteredData = filteredData.filter(property => 
            property.location.toLowerCase() === location.toLowerCase()
          );
        }
      }

      // Filtrar por tipo de propiedad
      if (type && type !== '') {
        filteredData = filteredData.filter(property => 
          property.category === type
        );
      }

      // Filtrar por tipo de operación
      if (operation && operation !== '') {
        filteredData = filteredData.filter(property => 
          property.type === operation
        );
      }

      // Filtrar por precio mínimo
      if (minPrice && !isNaN(Number(minPrice))) {
        const min = Number(minPrice);
        filteredData = filteredData.filter(property => 
          property.price >= min
        );
      }

      // Filtrar por precio máximo
      if (maxPrice && !isNaN(Number(maxPrice))) {
        const max = Number(maxPrice);
        filteredData = filteredData.filter(property => 
          property.price <= max
        );
      }

      setProperties(filteredData);
    } catch (err) {
      console.error('Error loading properties:', err);
      setError(err as PropertyApiError);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  return { 
    properties, 
    loading, 
    error,
    refetch: loadProperties
  };
}