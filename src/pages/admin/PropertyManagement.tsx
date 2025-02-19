import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, ArrowUpDown } from 'lucide-react';
import { PropertyForm } from '../../components/admin/PropertyForm';
import { Property } from '../../types/property';

export function PropertyManagement() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const handleSubmit = (data: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => {
    // Aquí iría la lógica para guardar la propiedad
    console.log(data);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Gestión de Propiedades</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg flex items-center"
            onClick={() => setShowForm(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Nueva Propiedad
          </motion.button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar propiedades..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                className="w-full pl-10 pr-4 py-2 border rounded-lg appearance-none"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">Todos los tipos</option>
                <option value="venta">En Venta</option>
                <option value="alquiler">En Alquiler</option>
              </select>
            </div>

            <div className="relative">
              <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                className="w-full pl-10 pr-4 py-2 border rounded-lg appearance-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Fecha</option>
                <option value="price">Precio</option>
                <option value="title">Título</option>
              </select>
            </div>
          </div>
        </div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">Nueva Propiedad</h2>
              <PropertyForm onSubmit={handleSubmit} />
              <button
                className="mt-4 text-gray-600 hover:text-gray-800"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}