import React from 'react';
import { SEO } from '../components/seo/SEO';
import { HeroSection } from '../components/ui/HeroSection';
import { Services } from '../components/Services';
import { BuyingSellingProcess } from '../components/BuyingSellingSectionProcess';
import { ServicesCTA } from '../components/services/ServicesCTA';

export function ServicesPage() {
  return (
    <div>
      <SEO 
        title="Servicios"
        description="Servicios inmobiliarios profesionales en Valencia. Compra, venta, alquiler, valoraciones y asesoramiento personalizado para todas tus necesidades inmobiliarias."
        canonical="/servicios"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Real Estate Services",
          "provider": {
            "@type": "RealEstateAgent",
            "name": "Gesttiona Inmobiliaria"
          },
          "areaServed": {
            "@type": "City",
            "name": "Valencia"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Servicios Inmobiliarios",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Compra y Venta de Propiedades"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Valoraciones Inmobiliarias"
                }
              }
            ]
          }
        }}
      />
      <HeroSection
        title="Nuestros Servicios"
        subtitle="Soluciones inmobiliarias integrales adaptadas a tus necesidades"
        backgroundImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      />
      <Services />
      <BuyingSellingProcess />
      <ServicesCTA />
    </div>
  );
}