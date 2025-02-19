import React from 'react';
import { useTranslation } from 'react-i18next';
import { LazyImage } from './ui/LazyImage';
import { images } from '../lib/images';

export function About() {
  const { t } = useTranslation('home');

  return (
    <section id="nosotros" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <LazyImage
              src={images.about}
              alt={t('about.imageAlt')}
              className="rounded-lg shadow-lg object-cover h-[600px] w-full"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold mb-6">{t('about.title')}</h2>
            <p className="text-gray-600 text-lg mb-6">
              {t('about.description1')}
            </p>
            <p className="text-gray-600 text-lg">
              {t('about.description2')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}