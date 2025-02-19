import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Home, Calculator, Megaphone, Scale, Banknote, Hammer } from 'lucide-react';

export function Services() {
  const { t } = useTranslation('services');

  const services = [
    {
      icon: Home,
      title: t('services.realEstate.title'),
      description: t('services.realEstate.description')
    },
    {
      icon: Calculator,
      title: t('services.valuation.title'),
      description: t('services.valuation.description')
    },
    {
      icon: Megaphone,
      title: t('services.marketing.title'),
      description: t('services.marketing.description')
    },
    {
      icon: Scale,
      title: t('services.legal.title'),
      description: t('services.legal.description')
    },
    {
      icon: Banknote,
      title: t('services.financing.title'),
      description: t('services.financing.description')
    },
    {
      icon: Hammer,
      title: t('services.renovation.title'),
      description: t('services.renovation.description')
    }
  ];

  return (
    <section id="servicios" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ 
                scale: 1.03,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <motion.div 
                className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <service.icon className="w-8 h-8 text-orange-600" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}