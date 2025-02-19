import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CallToAction() {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/contacto');
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-20 bg-orange-600">
      <div className="container mx-auto px-4">
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