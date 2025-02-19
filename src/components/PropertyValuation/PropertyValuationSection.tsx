import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PropertyValuationForm } from './PropertyValuationForm';
import { ValuationSteps } from './ValuationSteps';

export function PropertyValuationSection() {
  const { t } = useTranslation('home');

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
          <h2 className="text-4xl font-bold mb-4">{t('valuation.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('valuation.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <ValuationSteps />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 h-full"
          >
            <PropertyValuationForm />
            <p className="mt-4 text-sm text-gray-500 text-center">
              {t('valuation.disclaimer')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}