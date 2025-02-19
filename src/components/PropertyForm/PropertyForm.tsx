import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { PROPERTY_TYPES } from '../../lib/constants';
import { createProperty, updateProperty } from '../../lib/api/properties/propertiesApi';
import { useAuth } from '../../hooks/useAuth';
import { LoginForm } from '../admin/LoginForm';
import type { Property } from '../../types/property';

// Hardcoded locations
const LOCATIONS = [
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

interface PropertyFormProps {
  onClose: () => void;
  property?: Property;
  isEditing?: boolean;
  onSuccess?: () => void;
}

export function PropertyForm({ onClose, property, isEditing = false, onSuccess }: PropertyFormProps) {
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm({
    defaultValues: isEditing && property ? {
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      approximate_location: property.approximate_location || '',
      floor_number: property.floor_number || '',
      type: property.type,
      category: property.category,
      features: property.features,
      images: property.images.join('\n'),
      featured: property.featured
    } : undefined
  });

  const [tags, setTags] = useState<string[]>(property?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(!user);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const onSubmit = async (data: any) => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    try {
      setError(null);

      const propertyData = {
        title: data.title,
        description: data.description,
        price: Number(data.price),
        location: data.location,
        approximate_location: data.approximate_location || null,
        floor_number: data.floor_number ? Number(data.floor_number) : null,
        type: data.type,
        category: data.category,
        features: {
          bedrooms: Number(data.features.bedrooms),
          bathrooms: Number(data.features.bathrooms),
          size: Number(data.features.size),
          parking: Boolean(data.features.parking),
          garden: Boolean(data.features.garden),
          pool: Boolean(data.features.pool),
          terrace: Boolean(data.features.terrace)
        },
        images: data.images.split('\n').filter((url: string) => url.trim()),
        tags,
        featured: Boolean(data.featured)
      };

      if (isEditing && property) {
        await updateProperty(property.id, propertyData);
      } else {
        await createProperty(propertyData);
      }
      
      onSuccess?.();
      onClose();
    } catch (error: any) {
      console.error('Error saving property:', error);
      setError(error.message || 'Error al guardar la propiedad. Por favor, inténtalo de nuevo.');
    }
  };

  if (showLogin) {
    return (
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
          <LoginForm onSuccess={() => setShowLogin(false)} />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {isEditing ? 'Editar Propiedad' : 'Añadir Nueva Propiedad'}
        </h2>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título
            </label>
            <input
              {...register('title', { required: 'El título es obligatorio' })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
              placeholder="Ej: Ático con terraza en Valencia"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              {...register('description', { required: 'La descripción es obligatoria' })}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
              placeholder="Describe la propiedad..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio
              </label>
              <input
                type="number"
                {...register('price', { required: 'El precio es obligatorio' })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                placeholder="Ej: 250000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación
              </label>
              <select
                {...register('location', { required: 'La ubicación es obligatoria' })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
              >
                {LOCATIONS.map(location => (
                  <option key={location.value} value={location.value}>
                    {location.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Localización Aproximada
              </label>
              <input
                {...register('approximate_location')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                placeholder="Ej: Cerca del Mercado Central"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Piso
              </label>
              <select
                {...register('floor_number')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">No Aplica</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>
                    {num}º
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Operación
              </label>
              <select
                {...register('type', { required: 'El tipo es obligatorio' })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="venta">Venta</option>
                <option value="alquiler">Alquiler</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <select
                {...register('category', { required: 'La categoría es obligatoria' })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
              >
                {PROPERTY_TYPES.filter(type => type.value !== '').map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Habitaciones
              </label>
              <input
                type="number"
                {...register('features.bedrooms', { required: 'Obligatorio' })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Baños
              </label>
              <input
                type="number"
                {...register('features.bathrooms', { required: 'Obligatorio' })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Metros cuadrados
              </label>
              <input
                type="number"
                {...register('features.size', { required: 'Obligatorio' })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('features.parking')}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="ml-2">Parking</span>
              </label>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('features.garden')}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="ml-2">Jardín</span>
              </label>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('features.pool')}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="ml-2">Piscina</span>
              </label>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('features.terrace')}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="ml-2">Terraza</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URLs de imágenes
            </label>
            <textarea
              {...register('images', { required: 'Al menos una imagen es obligatoria' })}
              rows={3}
              className="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
              placeholder="Introduce las URLs de las imágenes, una por línea"
            />
            <p className="mt-1 text-sm text-gray-500">
              Puedes subir tus imágenes a servicios como Imgur o ImgBB y pegar las URLs aquí
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Etiquetas
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                placeholder="Ej: Terraza, Reformado, etc."
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('featured')}
                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <span className="ml-2">Destacar propiedad</span>
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Guardando...' : isEditing ? 'Guardar Cambios' : 'Guardar Propiedad'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}