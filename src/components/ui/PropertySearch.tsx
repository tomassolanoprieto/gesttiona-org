import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { PROPERTY_TYPES, OPERATION_TYPES } from '../../lib/constants';

// Hardcoded locations
const LOCATIONS = [
  { value: '', label: 'Todas las zonas' },
  { value: 'valencia-capital', label: 'Valencia Capital' },
  { value: 'horta-nord', label: 'L\'Horta Nord' },
  { value: 'horta-sud', label: 'L\'Horta Sud' },
  { value: 'horta-oest', label: 'L\'Horta Oest' },
  { value: 'camp-turia', label: 'Camp de Turia' },
  { value: 'camp-morvedre', label: 'Camp de Morvedre' },
  { value: 'ribera-alta', label: 'Ribera Alta' },
  { value: 'ribera-baixa', label: 'Ribera Baixa' },
  { value: 'costera', label: 'La Costera' },
  { value: 'vall-albaida', label: 'Vall d\'Albaida' },
  { value: 'safor', label: 'La Safor' },
  { value: 'otras', label: 'Otras' }
];

const containerVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export function PropertySearch() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [propertyType, setPropertyType] = useState(searchParams.get('type') || '');
  const [operationType, setOperationType] = useState(searchParams.get('operation') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (location) params.append('location', location);
    if (propertyType) params.append('type', propertyType);
    if (operationType) params.append('operation', operationType);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    
    navigate(`/propiedades?${params.toString()}`);
  };

  return (
    <motion.div 
      className="relative max-w-5xl mx-auto mt-12 z-10 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute inset-0 bg-orange-600 backdrop-blur-lg rounded-xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)] rounded-xl" />
      
      <div className="relative p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Encuentra tu propiedad ideal
        </h2>
        
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <div>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border-2 border-transparent focus:border-white/20 focus:outline-none transition-colors"
              title="Selecciona la zona"
            >
              {LOCATIONS.map((area) => (
                <option key={area.value} value={area.value}>
                  {area.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border-2 border-transparent focus:border-white/20 focus:outline-none transition-colors"
              title="Selecciona el tipo de propiedad"
            >
              {PROPERTY_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={operationType}
              onChange={(e) => setOperationType(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border-2 border-transparent focus:border-white/20 focus:outline-none transition-colors"
              title="Selecciona el tipo de operación"
            >
              {OPERATION_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Precio mínimo"
              className="w-full px-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border-2 border-transparent focus:border-white/20 focus:outline-none transition-colors"
              min="0"
              step="1000"
            />
          </div>

          <div>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Precio máximo"
              className="w-full px-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border-2 border-transparent focus:border-white/20 focus:outline-none transition-colors"
              min="0"
              step="1000"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors flex items-center justify-center md:col-span-2 lg:col-span-3 xl:col-span-5"
          >
            <Search className="w-5 h-5 mr-2" />
            Buscar
          </button>
        </form>
      </div>
    </motion.div>
  );
}