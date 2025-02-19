import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { contactInfo } from '../../data/contact';
import { images } from '../../lib/images';
import { navigateAndScroll } from '../../lib/utils/navigation';
import { NavLink } from './NavLink';
import { MobileMenu } from './MobileMenu';
import { LanguageSwitcher } from '../LanguageSwitcher';

export function MainNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.8;

      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else {
        if (currentScrollY > heroHeight) {
          setIsVisible(false);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavigation = (path: string) => {
    setIsMobileMenuOpen(false);
    navigateAndScroll(navigate, path);
  };

  return (
    <header className={`fixed w-full z-50 transition-transform duration-300 ${!isVisible ? '-translate-y-full' : ''}`}>
      <div className="bg-black/80 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Left Navigation */}
            <nav className="hidden lg:flex items-center space-x-12">
              <NavLink path="/" onClick={() => handleNavigation('/')}>
                {t('nav.home')}
              </NavLink>
              <NavLink path="/propiedades" onClick={() => handleNavigation('/propiedades')}>
                {t('nav.properties')}
              </NavLink>
              <NavLink path="/servicios" onClick={() => handleNavigation('/servicios')}>
                {t('nav.services')}
              </NavLink>
              <NavLink path="/nosotros" onClick={() => handleNavigation('/nosotros')}>
                {t('nav.about')}
              </NavLink>
            </nav>

            {/* Centered Logo */}
            <div className="flex-shrink-0 mx-8">
              <button
                onClick={() => handleNavigation('/')}
                className="flex items-center space-x-2"
              >
                <img src={images.logo} alt="Gesttiona Logo" className="h-12" />
              </button>
            </div>

            {/* Right Navigation */}
            <div className="hidden lg:flex items-center space-x-12">
              <NavLink path="/blog" onClick={() => handleNavigation('/blog')}>
                {t('nav.blog')}
              </NavLink>
              <NavLink path="/contacto" onClick={() => handleNavigation('/contacto')}>
                {t('nav.contact')}
              </NavLink>
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                className="flex items-center text-white hover:text-orange-400 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                <span>{contactInfo.phone}</span>
              </a>
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white hover:text-orange-400 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu onNavigate={handleNavigation} />
        )}
      </AnimatePresence>
    </header>
  );
}