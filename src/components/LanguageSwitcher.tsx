import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center text-white hover:text-orange-400 transition-colors"
      aria-label={i18n.language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <Globe className="w-5 h-5 mr-2" />
      <span>{i18n.language === 'es' ? 'EN' : 'ES'}</span>
    </button>
  );
}