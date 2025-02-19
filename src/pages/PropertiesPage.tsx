import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { SEO } from '../components/seo/SEO';
import { HeroSection } from '../components/ui/HeroSection';
import { PropertyList } from '../components/properties/PropertyList';
import { PropertySearch } from '../components/ui/PropertySearch';
import { AddPropertyButton } from '../components/PropertyForm/AddPropertyButton';

export function PropertiesPage() {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Propiedades"
        description="Explora nuestra selección de propiedades en venta y alquiler en Valencia"
        canonical="/propiedades"
      />
      
      <HeroSection
        title="Nuestras Propiedades"
        subtitle="Encuentra tu hogar ideal entre nuestra selección de propiedades"
        backgroundImage="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      />

      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Propiedades Disponibles</h2>
            <button
              onClick={() => document.querySelector('.add-property-button')?.click()}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Añadir Propiedad
            </button>
          </div>
          
          <PropertySearch />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            <PropertyList />
          </motion.div>
        </div>
      </div>

      <AddPropertyButton className="add-property-button" />
    </div>
  );
}