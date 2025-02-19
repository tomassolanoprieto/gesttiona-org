import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TestimonialCard } from './testimonials/TestimonialCard';
import { ShareExperienceButton } from './testimonials/ShareExperienceButton';
import type { Testimonial } from '../types/testimonial';

export function Testimonials() {
  const { t } = useTranslation('home');

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: t('testimonials.clients.1.name'),
      role: t('testimonials.clients.1.role'),
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      content: t('testimonials.clients.1.content'),
      rating: 5
    },
    {
      id: 2,
      name: t('testimonials.clients.2.name'),
      role: t('testimonials.clients.2.role'),
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      content: t('testimonials.clients.2.content'),
      rating: 5
    },
    {
      id: 3,
      name: t('testimonials.clients.3.name'),
      role: t('testimonials.clients.3.role'),
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      content: t('testimonials.clients.3.content'),
      rating: 5
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 text-white">{t('testimonials.title')}</h2>
          <p className="text-gray-100 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <ShareExperienceButton />
        </motion.div>
      </div>
    </section>
  );
}