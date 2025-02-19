import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const phoneNumber = '34685740740'; // Spanish format
  const message = 'Hola, me gustaría obtener más información sobre sus servicios inmobiliarios.';

  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors">
        <MessageCircle className="w-6 h-6" />
      </div>
    </motion.a>
  );
}