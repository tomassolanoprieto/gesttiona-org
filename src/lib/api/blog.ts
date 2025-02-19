import type { BlogPost } from '../../types/blog';
import { blogPosts } from '../../data/blogPosts';

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // Transform the static blog posts data into BlogPost type
    return blogPosts.map(post => ({
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
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw new Error('Failed to fetch blog posts');
  }
}