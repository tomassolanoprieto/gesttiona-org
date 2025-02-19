import { API_URL } from '../constants/config';
import type { BlogPost } from '../../types/blog';
import type { Property } from '../../types/property';

export async function createBlogPost(post: Omit<BlogPost, 'id' | 'publishedAt' | 'updatedAt'>) {
  try {
    const response = await fetch(`${API_URL}/api/blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      throw new Error('Failed to create blog post');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
}

export async function createProperty(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const response = await fetch(`${API_URL}/api/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(property),
    });

    if (!response.ok) {
      throw new Error('Failed to create property');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating property:', error);
    throw error;
  }
}