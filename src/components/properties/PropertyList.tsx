import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Trash2 } from 'lucide-react';
import { useProperties } from '../../hooks/useProperties';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { useAuth } from '../../hooks/useAuth';
import { deleteProperty } from '../../lib/api/properties/propertiesApi';
import { PropertyForm } from '../PropertyForm/PropertyForm';
import { LoginForm } from '../admin/LoginForm';
import { PropertyCard } from '../ui/PropertyCard';
import type { Property } from '../../types/property';

export function PropertyList() {
  const { properties, loading, error, refetch } = useProperties();
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      setPendingDeleteId(id);
      setShowLoginForm(true);
      return;
    }

    if (!window.confirm('¿Estás seguro de que quieres eliminar esta propiedad?')) {
      return;
    }

    try {
      setIsDeleting(id);
      setDeleteError(null);
      await deleteProperty(id);
      await refetch();
    } catch (error: any) {
      console.error('Error deleting property:', error);
      setDeleteError(error.message || 'Error al eliminar la propiedad. Por favor, inténtalo de nuevo.');
    } finally {
      setIsDeleting(null);
    }
  };

  const handleEdit = (property: Property, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      setEditingProperty(property);
      setShowLoginForm(true);
      return;
    }

    setEditingProperty(property);
  };

  const handleLoginSuccess = async () => {
    setShowLoginForm(false);
    if (pendingDeleteId) {
      await handleDelete(pendingDeleteId, { preventDefault: () => {}, stopPropagation: () => {} } as React.MouseEvent);
      setPendingDeleteId(null);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      {deleteError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {deleteError}
        </div>
      )}

      {properties.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No se encontraron propiedades</h3>
          <p className="text-gray-500">No hay propiedades que coincidan con los criterios de búsqueda seleccionados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <PropertyCard property={property} />
              
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2 z-10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => handleEdit(property, e)}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-blue-50 transition-colors"
                  title="Editar propiedad"
                >
                  <Pencil className="w-4 h-4 text-blue-600" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => handleDelete(property.id, e)}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
                  disabled={isDeleting === property.id}
                  title="Eliminar propiedad"
                >
                  <Trash2 className={`w-4 h-4 ${isDeleting === property.id ? 'text-gray-400' : 'text-red-600'}`} />
                </motion.button>
              </div>

              {isDeleting === property.id && (
                <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] rounded-lg flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-orange-600 border-t-transparent"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {showLoginForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <LoginForm 
              onSuccess={handleLoginSuccess} 
              onClose={() => {
                setShowLoginForm(false);
                setPendingDeleteId(null);
              }}
            />
          </motion.div>
        </motion.div>
      )}

      {editingProperty && (
        <PropertyForm
          property={editingProperty}
          isEditing={true}
          onClose={() => setEditingProperty(null)}
          onSuccess={async () => {
            await refetch();
            setEditingProperty(null);
          }}
        />
      )}
    </>
  );
}