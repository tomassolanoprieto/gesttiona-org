import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from './Hero';
import { PropertySearch } from './ui/PropertySearch';
import { PropertyCategories } from './PropertyCategories';
import { FeaturedProperties } from './FeaturedProperties';
import { PropertyValuationSection } from './PropertyValuation/PropertyValuationSection';
import { Services } from './Services';
import { Testimonials } from './Testimonials';
import { WhyChooseUs } from './WhyChooseUs';
import { About } from './About';
import { BlogPreview } from './BlogPreview';
import { ContactCallToAction } from './ContactCallToAction';

// ... rest of the file remains the same ...

export function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <div className="relative bg-white">
        <PropertySearch />
        <PropertyCategories />
        <FeaturedProperties />
        <PropertyValuationSection />
      </div>
      
      {/* ... rest of the components remain the same ... */}
    </motion.div>
  );
}