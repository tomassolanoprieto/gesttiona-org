import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogPostForm } from '../../components/admin/BlogPostForm';
import { useAdmin } from '../../hooks/useAdmin';
import type { BlogPostFormData } from '../../types/blog';

export function BlogPostEditor() {
  const navigate = useNavigate();
  const { createBlogPost, isLoading, error } = useAdmin();

  const handleSubmit = async (data: BlogPostFormData) => {
    try {
      await createBlogPost(data);
      navigate('/admin');
    } catch (err) {
      console.error('Error creating blog post:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Nuevo Artículo del Blog</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            Error al crear el artículo. Por favor, inténtalo de nuevo.
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6">
          <BlogPostForm onSubmit={handleSubmit} isSubmitting={isLoading} />
        </div>
      </div>
    </div>
  );
}