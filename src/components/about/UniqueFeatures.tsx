import React from 'react';
import { motion } from 'framer-motion';
import { Users, Camera, Map, Clock } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Enfoque Personalizado',
    description: 'Cada cliente es único, por eso adaptamos nuestros servicios a tus necesidades específicas.'
  },
  {
    icon: Camera,
    title: 'Tecnología Avanzada',
    description: 'Utilizamos fotografía 360º, drones y recorridos virtuales para mostrar las propiedades en su mejor luz.'
  },
  {
    icon: Map,
    title: 'Experiencia Local',
    description: 'Profundo conocimiento del mercado inmobiliario en Valencia y sus alrededores.'
  },
  {
    icon: Clock,
    title: 'Disponibilidad Total',
    description: 'Estamos a tu disposición cuando nos necesites, ofreciendo atención continua y personalizada.'
  }
];

export function UniqueFeatures() {
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
          <h2 className="text-4xl font-bold mb-4">¿Qué Nos Hace Únicos?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre las características que nos diferencian y nos permiten ofrecer un servicio excepcional
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="bg-orange-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}