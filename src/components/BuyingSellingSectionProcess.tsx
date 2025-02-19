import React from 'react';
import { motion } from 'framer-motion';
import { LazyImage } from './ui/LazyImage';
import { images } from '../lib/images';
import { Search, TrendingUp, Handshake } from 'lucide-react';

const processSteps = [
  {
    icon: Search,
    title: 'Tasación Profesional',
    description: 'Realizamos una evaluación detallada de tu propiedad utilizando datos del mercado actual y comparables en la zona para determinar el precio óptimo.'
  },
  {
    icon: TrendingUp,
    title: 'Marketing Estratégico',
    description: 'Desarrollamos un plan de marketing personalizado que incluye fotografía profesional, tours virtuales y promoción en las principales plataformas inmobiliarias.'
  },
  {
    icon: Handshake,
    title: 'Negociación y Cierre',
    description: 'Te acompañamos durante todo el proceso de negociación, asegurando las mejores condiciones y gestionando toda la documentación necesaria.'
  }
];

export function BuyingSellingProcess() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <LazyImage
              src={images.services}
              alt="Proceso de compra y venta"
              className="rounded-lg shadow-lg object-cover h-[600px] w-full"
            />
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold mb-6">Compra y Venta de Propiedades</h2>
            <p className="text-gray-600 text-lg mb-8">
              En Gesttiona, simplificamos el proceso de compra y venta de propiedades, 
              ofreciendo un servicio integral y personalizado para garantizar el éxito 
              de tu operación inmobiliaria.
            </p>
            
            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <step.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}