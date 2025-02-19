import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { contactInfo } from '../data/contact';
import { ContactForm } from './ContactForm';

export function Contact() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-orange-600"></div>
      <div className="container mx-auto px-4 relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 text-white">¿Hablamos?</h2>
          <p className="text-gray-100 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Contáctanos y te responderemos lo antes posible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <ContactForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6"
          >
            {[
              { icon: Phone, title: 'Teléfono', content: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, '')}` },
              { icon: Mail, title: 'Email', content: contactInfo.email, href: `mailto:${contactInfo.email}` },
              { icon: MapPin, title: 'Dirección', content: contactInfo.address, href: `https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}` },
              { icon: Clock, title: 'Horario', content: `Atención: ${contactInfo.officeHours}\nOficina: ${contactInfo.businessHours}` }
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                target={item.icon === MapPin ? '_blank' : undefined}
                rel={item.icon === MapPin ? 'noopener noreferrer' : undefined}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center"
              >
                <item.icon className="w-8 h-8 text-white shrink-0" />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="text-white/90 whitespace-pre-line">{item.content}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}