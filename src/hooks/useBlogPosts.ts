import { useState, useEffect } from 'react';
import { getBlogPosts } from '../lib/api/blog';
import { blogPosts } from '../data/blogPosts';
import type { BlogPost } from '../types/blog';

export function useBlogPosts(useFallback = true) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getBlogPosts();
        setPosts(data);
      } catch (err) {
        console.error('Error loading blog posts:', err);
        setError('Error al cargar los artículos. Por favor, inténtalo de nuevo más tarde.');
        
        // Use fallback data if enabled
        if (useFallback) {
          setPosts(blogPosts.map(post => ({
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            author: {
              name: post.author,
              avatar: undefined
            },
            category: post.category,
            image: post.image,
            date: post.date,
            tags: [],
            slug: post.id,
            publishedAt: new Date(post.date)
          })));
          setError(null);
        }
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [useFallback]);

  return { posts, loading, error };
}