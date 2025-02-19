import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import type { Testimonial } from '../../types/testimonial';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.03,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      className="bg-white rounded-xl p-8 shadow-xl relative"
    >
      <div className="absolute -top-4 -right-4 bg-orange-500 rounded-full p-3">
        <Quote className="w-6 h-6 text-white" />
      </div>
      
      <div className="flex items-center mb-6">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="text-xl font-semibold">{testimonial.name}</h3>
          <p className="text-gray-600">{testimonial.role}</p>
        </div>
      </div>

      <p className="text-gray-700 mb-6">{testimonial.content}</p>

      <div className="flex items-center">
        {[...Array(testimonial.rating)].map((_, index) => (
          <Star
            key={index}
            className="w-5 h-5 text-yellow-400 fill-current"
          />
        ))}
      </div>
    </motion.div>
  );
}