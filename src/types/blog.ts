export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  image: string;
  publishedAt: Date;
  updatedAt?: Date;
}

export interface BlogPostFormData extends Omit<BlogPost, 'id' | 'slug' | 'publishedAt' | 'updatedAt'> {}