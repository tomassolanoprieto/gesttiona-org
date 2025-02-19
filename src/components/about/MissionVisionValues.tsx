import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart } from 'lucide-react';

const sections = [
  {
    icon: Target,
    title: 'Misión',
    content: 'Conectar personas con sus sueños inmobiliarios, proporcionando un servicio personalizado y profesional que transforme la búsqueda de propiedades en una experiencia excepcional.'
  },
  {
    icon: Eye,
    title: 'Visión',
    content: 'Ser la inmobiliaria líder en la Comunidad Valenciana, reconocida por nuestra excelencia en el servicio, innovación tecnológica y compromiso con la satisfacción del cliente.'
  },
  {
    icon: Heart,
    title: 'Valores',
    values: [
      'Transparencia en cada interacción',
      'Empatía con las necesidades de nuestros clientes',
      'Innovación en nuestros procesos y servicios',
      'Compromiso con la excelencia',
      'Integridad profesional'
    ]
  }
];

export function MissionVisionValues() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">Nuestra Esencia</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre los principios que guían nuestro trabajo y nos impulsan a ser mejores cada día
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <section.icon className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">{section.title}</h3>
              {section.content ? (
                <p className="text-gray-600 text-center">{section.content}</p>
              ) : (
                <ul className="space-y-2">
                  {section.values?.map((value, i) => (
                    <li key={i} className="text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-orange-600 rounded-full mr-2"></span>
                      {value}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}