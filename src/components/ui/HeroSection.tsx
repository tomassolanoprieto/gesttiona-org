import React from 'react';
import { motion } from 'framer-motion';
import { LazyImage } from './LazyImage';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export function HeroSection({ 
  title, 
  subtitle, 
  backgroundImage
}: HeroSectionProps) {
  return (
    <div className="relative h-screen min-h-[600px] mb-12">
      <div className="absolute inset-0">
        <LazyImage
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl backdrop-blur-sm bg-black/30 p-8 rounded-lg">
          <motion.h1 
            className="text-5xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-200 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
    </div>
  );
}