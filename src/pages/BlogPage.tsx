import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/seo/SEO';
import { HeroSection } from '../components/ui/HeroSection';
import { BlogCard } from '../components/blog/BlogCard';
import { blogPosts } from '../data/blogPosts';

export function BlogPage() {
  return (
    <div>
      <SEO 
        title="Blog"
        description="Mantente informado sobre el mercado inmobiliario en Valencia. Noticias, consejos, tendencias y análisis del sector inmobiliario."
        canonical="/blog"
        type="article"
      />
      
      <HeroSection
        title="Nuestro Blog"
        subtitle="Mantente informado sobre las últimas tendencias y noticias del mercado inmobiliario"
        backgroundImage="https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      />

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BlogCard 
                post={{
                  ...post,
                  author: { name: post.author },
                  slug: post.id,
                  publishedAt: new Date(post.date),
                  tags: []
                }} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}