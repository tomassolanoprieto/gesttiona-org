import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/seo/SEO';
import { HeroSection } from '../components/ui/HeroSection';
import { ContactForm } from '../components/ContactForm';
import { ContactInfo } from '../components/contact/ContactInfo';
import { contactInfo } from '../data/contact';

export function ContactPage() {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Contacto"
        description="Contacta con Gesttiona Inmobiliaria. Estamos aquí para ayudarte con todas tus necesidades inmobiliarias en Valencia."
        canonical="/contacto"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "mainEntity": {
            "@type": "RealEstateAgent",
            "name": "Gesttiona Inmobiliaria",
            "telephone": contactInfo.phone,
            "email": contactInfo.email,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Calle L'Entrada 40 Bajo",
              "addressLocality": "Benaguacil",
              "addressRegion": "Valencia",
              "postalCode": "46180",
              "addressCountry": "ES"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "19:00"
              }
            ]
          }
        }}
      />

      <HeroSection
        title="Contacta con Nosotros"
        subtitle="Estamos aquí para ayudarte. Ponte en contacto con nuestro equipo de expertos"
        backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      />

      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ContactInfo />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}