import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

export function BlogArticlePage() {
  const { id } = useParams();
  const post = blogPosts.find(post => post.id === id);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-2xl">Artículo no encontrado</h1>
        <Link to="/blog" className="text-orange-600">Volver al blog</Link>
      </div>
    );
  }

  return (
    <motion.div 
      className="pt-24 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <Link 
          to="/blog"
          className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al blog
        </Link>

        <article className="max-w-4xl mx-auto">
          <motion.img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-6 text-gray-600 mb-4">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {post.date}
              </span>
              <span className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {post.author}
              </span>
              <span className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
            
            <div className="prose prose-lg max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </article>
      </div>
    </motion.div>
  );
}