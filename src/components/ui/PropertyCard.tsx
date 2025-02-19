import React from 'react';
import { Bed, Bath, Square, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Property } from '../../types/property';
import { formatPrice, formatArea, cn } from '../../lib/utils';

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

export function PropertyCard({ property, featured }: PropertyCardProps) {
  const navigate = useNavigate();

  const handleTagClick = (tag: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevenir la navegación al detalle de la propiedad
    navigate(`/propiedades?tag=${encodeURIComponent(tag)}`);
  };

  return (
    <Link 
      to={`/propiedades/${property.id}`} 
      className="block group hover:transform hover:scale-[1.02] transition-all duration-300"
    >
      <div className={cn(
        "bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-xl cursor-pointer",
        featured && "border-2 border-orange-500"
      )}>
        <div className="relative h-48">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm">
              {property.type === 'venta' ? 'Venta' : 'Alquiler'}
            </span>
          </div>
          {featured && (
            <div className="absolute top-4 left-4">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                Destacado
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-600 transition-colors">
            {property.title}
          </h3>
          <p className="text-gray-600 mb-2">{property.location}</p>
          {property.approximate_location && (
            <p className="text-gray-500 text-sm mb-2">
              {property.approximate_location}
            </p>
          )}
          <p className="text-2xl font-bold text-orange-600 mb-4">
            {formatPrice(property.price)}
          </p>
          <div className="flex items-center justify-between text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Bed className="w-5 h-5" />
              <span>{property.features.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-5 h-5" />
              <span>{property.features.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="w-5 h-5" />
              <span>{formatArea(property.features.size)}</span>
            </div>
            {property.floor_number && (
              <div className="text-sm">
                <span>{property.floor_number}º piso</span>
              </div>
            )}
          </div>
          {property.tags && property.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {property.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={(e) => handleTagClick(tag, e)}
                  className="flex items-center text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-orange-100 hover:text-orange-600 transition-colors"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}