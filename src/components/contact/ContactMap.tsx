import React from 'react';
import { motion } from 'framer-motion';

export function ContactMap() {
  return (
    <motion.div
      className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3077.474630005197!2d-0.5901344!3d39.5901344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd60d8a7a6c0f8d9%3A0x9c0f8d9b0f8d9b0f!2sGesttiona%20Inmobiliaria!5e0!3m2!1ses!2ses!4v1620000000000!5m2!1ses!2ses"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </motion.div>
  );
}