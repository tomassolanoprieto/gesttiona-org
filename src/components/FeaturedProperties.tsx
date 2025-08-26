import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PropertyCard } from './ui/PropertyCard';
import { featuredProperties } from '../data/properties';

export function FeaturedProperties() {
  const handleViewAllProperties = () => {
    window.open('https://propiedades.gesttiona.org', '_blank');
  };

  return (
    <section id="featured-properties" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Propiedades Destacadas</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra selección de propiedades más exclusivas en las mejores zonas de Valencia
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} featured />
          ))}
        </div>
        <div className="text-center mt-12">
          <button
            onClick={handleViewAllProperties}
            className="inline-flex items-center bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Ver Todas las Propiedades
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
