import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { navigateAndScroll } from '../../lib/utils/navigation';

export function ShareExperienceButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigateAndScroll(navigate, '/contacto');
  };

  return (
    <motion.button 
      onClick={handleClick}
      className="inline-flex items-center bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Comparte tu experiencia
    </motion.button>
  );
}