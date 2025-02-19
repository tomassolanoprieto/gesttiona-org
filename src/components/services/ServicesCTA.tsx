import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { navigateAndScroll } from '../../lib/utils/navigation';

export function ServicesCTA() {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigateAndScroll(navigate, '/contacto');
  };

  return (
    <section className="py-20 bg-orange-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />
      <div className="container mx-auto px-4 relative">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6 text-white">
            ¿Listo para Encontrar tu Hogar Ideal?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Nuestro equipo está preparado para ayudarte a hacer realidad tus sueños inmobiliarios
          </p>
          <button
            onClick={handleContactClick}
            className="inline-flex items-center bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
          >
            Contacta con Nosotros
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}