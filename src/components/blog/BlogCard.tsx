import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import type { BlogPost } from '../../types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <img 
        src={post.image} 
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(post.date).toLocaleDateString()}
          </span>
          <span className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            {post.author.name}
          </span>
        </div>
        <span className="text-orange-600 text-sm font-semibold">{post.category}</span>
        <h3 className="text-xl font-bold mt-2 mb-3">{post.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
        <Link 
          to={`/blog/${post.id}`}
          className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700"
        >
          Leer más
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}