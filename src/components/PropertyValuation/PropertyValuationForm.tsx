import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { VALENCIA_LOCATIONS, PROPERTY_TYPES } from '../../lib/constants';
import { VALUATION_EMAIL_CONFIG } from '../../lib/constants/config';
import type { PropertyValuationData } from '../../types/propertyValuation';

export function PropertyValuationForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<PropertyValuationData>();

  const onSubmit = async (data: PropertyValuationData) => {
    try {
      await emailjs.send(
        VALUATION_EMAIL_CONFIG.SERVICE_ID,
        VALUATION_EMAIL_CONFIG.TEMPLATE_ID,
        {
          property_type: data.propertyType,
          location: data.location,
          cadastral_reference: data.cadastralReference,
          full_name: data.fullName,
          email: data.email,
          phone: data.phone,
          to_email: 'gesttiona.mcb@gmail.com'
        },
        VALUATION_EMAIL_CONFIG.PUBLIC_KEY
      );
      
      reset();
      alert('Solicitud enviada correctamente. Nos pondremos en contacto contigo pronto.');
    } catch (error) {
      console.error('Error sending valuation request:', error);
      alert('Error al enviar la solicitud. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de inmueble
        </label>
        <select
          {...register('propertyType', { required: 'Este campo es obligatorio' })}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
        >
          {PROPERTY_TYPES.filter(type => type.value !== '').map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.propertyType && (
          <p className="mt-1 text-sm text-red-600">{errors.propertyType.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Municipio
        </label>
        <select
          {...register('location', { required: 'Este campo es obligatorio' })}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
        >
          {VALENCIA_LOCATIONS.filter(loc => loc.value !== '').map(location => (
            <option key={location.value} value={location.value} title={location.description}>
              {location.label}
            </option>
          ))}
        </select>
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Referencia Catastral
        </label>
        <input
          type="text"
          {...register('cadastralReference', { required: 'Este campo es obligatorio' })}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
          placeholder="Introduce la referencia catastral"
        />
        {errors.cadastralReference && (
          <p className="mt-1 text-sm text-red-600">{errors.cadastralReference.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nombre completo
        </label>
        <input
          type="text"
          {...register('fullName', { required: 'Este campo es obligatorio' })}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
          placeholder="Tu nombre"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          {...register('email', { 
            required: 'Este campo es obligatorio',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email inválido'
            }
          })}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
          placeholder="tu@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Teléfono
        </label>
        <input
          type="tel"
          {...register('phone', { required: 'Este campo es obligatorio' })}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
          placeholder="Tu teléfono"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-orange-600 text-white py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? 'Enviando...' : 'Solicitar Valoración Gratuita'}
      </motion.button>
    </form>
  );
}