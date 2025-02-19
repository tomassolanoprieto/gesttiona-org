import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { contactInfo } from '../../data/contact';

interface MobileMenuProps {
  onNavigate: (path: string) => void;
}

export function MobileMenu({ onNavigate }: MobileMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="lg:hidden bg-black/95 backdrop-blur-lg"
    >
      <div className="container mx-auto px-4 py-6">
        <nav className="space-y-4">
          <button
            onClick={() => onNavigate('/')}
            className="block w-full text-left text-white hover:text-orange-400 transition-colors text-lg py-2"
          >
            Inicio
          </button>
          <button
            onClick={() => onNavigate('/propiedades')}
            className="block w-full text-left text-white hover:text-orange-400 transition-colors text-lg py-2"
          >
            Propiedades
          </button>
          <button
            onClick={() => onNavigate('/servicios')}
            className="block w-full text-left text-white hover:text-orange-400 transition-colors text-lg py-2"
          >
            Servicios
          </button>
          <button
            onClick={() => onNavigate('/nosotros')}
            className="block w-full text-left text-white hover:text-orange-400 transition-colors text-lg py-2"
          >
            Nosotros
          </button>
          <button
            onClick={() => onNavigate('/blog')}
            className="block w-full text-left text-white hover:text-orange-400 transition-colors text-lg py-2"
          >
            Blog
          </button>
          <button
            onClick={() => onNavigate('/contacto')}
            className="block w-full text-left text-white hover:text-orange-400 transition-colors text-lg py-2"
          >
            Contacto
          </button>
        </nav>

        <div className="mt-6 pt-6 border-t border-white/10">
          <a
            href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
            className="flex items-center text-white hover:text-orange-400 transition-colors"
          >
            <Phone className="w-5 h-5 mr-2" />
            <span>{contactInfo.phone}</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}