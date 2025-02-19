import { useMutation, useQueryClient } from 'react-query';
import { createBlogPost, createProperty } from '../lib/api/admin';
import type { BlogPost } from '../types/blog';
import type { Property } from '../types/property';

export function useAdmin() {
  const queryClient = useQueryClient();

  const blogMutation = useMutation(
    (post: Omit<BlogPost, 'id' | 'publishedAt' | 'updatedAt'>) => createBlogPost(post),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('blog-posts');
      },
    }
  );

  const propertyMutation = useMutation(
    (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => createProperty(property),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('properties');
      },
    }
  );

  return {
    createBlogPost: blogMutation.mutate,
    createProperty: propertyMutation.mutate,
    isLoading: blogMutation.isLoading || propertyMutation.isLoading,
    error: blogMutation.error || propertyMutation.error,
  };
}