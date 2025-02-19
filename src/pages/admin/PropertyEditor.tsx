import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PropertyForm } from '../../components/admin/PropertyForm';
import { useAdmin } from '../../hooks/useAdmin';
import type { PropertyFormData } from '../../types/property';

export function PropertyEditor() {
  const navigate = useNavigate();
  const { createProperty, isLoading, error } = useAdmin();

  const handleSubmit = async (data: PropertyFormData) => {
    try {
      await createProperty(data);
      navigate('/admin');
    } catch (err) {
      console.error('Error creating property:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Nueva Propiedad</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            Error al crear la propiedad. Por favor, inténtalo de nuevo.
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6">
          <PropertyForm onSubmit={handleSubmit} isSubmitting={isLoading} />
        </div>
      </div>
    </div>
  );
}