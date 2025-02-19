import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bed, Bath, Square, MapPin, ArrowLeft, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { formatPrice, formatArea } from '../lib/utils';
import { useProperty } from '../hooks/useProperty';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { ContactForm } from '../components/ContactForm';
import { SEO } from '../components/seo/SEO';

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { property, loading, error } = useProperty(id!);
  const [activeIndex, setActiveIndex] = useState(0);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!property) return <ErrorMessage message="Propiedad no encontrada" />;

  return (
    <div className="pt-24">
      <SEO 
        title={property.title}
        description={property.description}
        canonical={`/propiedades/${property.id}`}
        image={property.images[0]}
      />

      <div className="container mx-auto px-4">
        <Link 
          to="/propiedades"
          className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a propiedades
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                  prevEl: '.swiper-button-prev',
                  nextEl: '.swiper-button-next',
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                className="w-full h-[500px] rounded-lg"
              >
                {property.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`${property.title} - Imagen ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
                <button className="swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors">
                  <ChevronLeft className="w-6 h-6 text-gray-800" />
                </button>
                <button className="swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors">
                  <ChevronRight className="w-6 h-6 text-gray-800" />
                </button>
              </Swiper>
            </div>
            
            {property.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`relative rounded-lg overflow-hidden ${
                      activeIndex === index ? 'ring-2 ring-orange-500' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${property.title} - Miniatura ${index + 1}`}
                      className="w-full h-24 object-cover hover:opacity-80 transition-opacity"
                    />
                    {activeIndex === index && (
                      <div className="absolute inset-0 bg-orange-500/20" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
              {property.type === 'venta' ? 'En Venta' : 'En Alquiler'}
            </span>
            
            <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
            
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              {property.location}
            </div>

            {property.approximate_location && (
              <div className="text-gray-600 mb-4">
                <p className="italic">Cerca de: {property.approximate_location}</p>
              </div>
            )}

            <p className="text-3xl font-bold text-orange-600 mb-6">
              {formatPrice(property.price)}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="flex items-center">
                <Bed className="w-5 h-5 text-orange-600 mr-2" />
                <span>{property.features.bedrooms} Habitaciones</span>
              </div>
              <div className="flex items-center">
                <Bath className="w-5 h-5 text-orange-600 mr-2" />
                <span>{property.features.bathrooms} Baños</span>
              </div>
              <div className="flex items-center">
                <Square className="w-5 h-5 text-orange-600 mr-2" />
                <span>{formatArea(property.features.size)}</span>
              </div>
              {property.floor_number && (
                <div className="flex items-center">
                  <span>{property.floor_number}º Piso</span>
                </div>
              )}
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Características</h2>
              <div className="grid grid-cols-2 gap-4">
                {property.features.parking && (
                  <div className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mr-2"></span>
                    Parking
                  </div>
                )}
                {property.features.garden && (
                  <div className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mr-2"></span>
                    Jardín
                  </div>
                )}
                {property.features.pool && (
                  <div className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mr-2"></span>
                    Piscina
                  </div>
                )}
                {property.features.terrace && (
                  <div className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mr-2"></span>
                    Terraza
                  </div>
                )}
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              <h2 className="text-xl font-semibold mb-4">Descripción</h2>
              <p className="text-gray-600">{property.description}</p>
            </div>

            {property.tags && property.tags.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Etiquetas</h2>
                <div className="flex flex-wrap gap-2">
                  {property.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                    >
                      <Tag className="w-4 h-4 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">¿Te interesa esta propiedad?</h2>
              <ContactForm isPopup />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}