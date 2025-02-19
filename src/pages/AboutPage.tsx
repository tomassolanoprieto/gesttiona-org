import React from 'react';
import { SEO } from '../components/seo/SEO';
import { HeroSection } from '../components/ui/HeroSection';
import { About } from '../components/About';
import { Testimonials } from '../components/Testimonials';
import { MissionVisionValues } from '../components/about/MissionVisionValues';
import { UniqueFeatures } from '../components/about/UniqueFeatures';
import { CallToAction } from '../components/about/CallToAction';

export function AboutPage() {
  return (
    <div>
      <SEO 
        title="Sobre Nosotros"
        description="Conoce a Gesttiona Inmobiliaria, tu agencia de confianza en Valencia. Descubre nuestra historia, valores y compromiso con la excelencia en el sector inmobiliario."
        canonical="/nosotros"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "mainEntity": {
            "@type": "RealEstateAgent",
            "name": "Gesttiona Inmobiliaria",
            "description": "Agencia inmobiliaria líder en Valencia",
            "foundingDate": "2020",
            "areaServed": {
              "@type": "City",
              "name": "Valencia"
            }
          }
        }}
      />
      <HeroSection
        title="Sobre Nosotros"
        subtitle="Conoce el equipo detrás de Gesttiona y nuestra pasión por el sector inmobiliario"
        backgroundImage="https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      />
      <About />
      <div className="relative bg-orange-600">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />
        <Testimonials />
      </div>
      <MissionVisionValues />
      <UniqueFeatures />
      <CallToAction />
    </div>
  );
}