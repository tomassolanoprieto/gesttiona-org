import React from 'react';
import { useForm } from 'react-hook-form';
import { BlogPostFormData } from '../../types/blog';

export function BlogPostForm({ onSubmit, initialData }: {
  onSubmit: (data: BlogPostFormData) => void;
  initialData?: BlogPostFormData;
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<BlogPostFormData>({
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Título</label>
        <input
          type="text"
          {...register('title', { required: 'El título es obligatorio' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Extracto</label>
        <textarea
          {...register('excerpt', { required: 'El extracto es obligatorio' })}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Contenido</label>
        <textarea
          {...register('content', { required: 'El contenido es obligatorio' })}
          rows={10}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Categoría</label>
        <input
          type="text"
          {...register('category', { required: 'La categoría es obligatoria' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Imagen</label>
        <input
          type="text"
          {...register('image', { required: 'La imagen es obligatoria' })}
          placeholder="URL de la imagen"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Autor</label>
        <input
          type="text"
          {...register('author.name', { required: 'El autor es obligatorio' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors"
      >
        Publicar Artículo
      </button>
    </form>
  );
}