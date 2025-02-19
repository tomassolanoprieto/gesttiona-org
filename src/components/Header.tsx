import React from 'react';
import { Building2, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { ContactInfo } from '../types';

export const contactInfo: ContactInfo = {
  email: 'gesttiona.mcb@gmail.com',
  phone: '685 740 740',
  address: 'Calle L\'Entrada 40 Bajo, Benaguacil, Valencia, 46180',
  officeHours: 'Lunes a Viernes: 9:00h-14:00h y 15:00h-19:00h',
  businessHours: 'Lunes a Viernes: 9:00h-13:00h'
};

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="py-2 text-sm border-b">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hover:text-orange-600">
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-orange-600">
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Building2 className="w-8 h-8 text-orange-600 mr-2" />
            <span className="text-2xl font-bold">Gesttiona</span>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#inicio" className="hover:text-orange-600">Inicio</a></li>
              <li><a href="#servicios" className="hover:text-orange-600">Servicios</a></li>
              <li><a href="#nosotros" className="hover:text-orange-600">Nosotros</a></li>
              <li><a href="#contacto" className="hover:text-orange-600">Contacto</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}