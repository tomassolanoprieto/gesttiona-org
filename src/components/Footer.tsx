import React from 'react';
import { Building2, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { contactInfo } from '../data/contact';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-6">
              <Building2 className="w-8 h-8 text-orange-600 mr-2" />
              <span className="text-2xl font-bold">Gesttiona</span>
            </div>
            <p className="text-gray-400 mb-6">
              Tu empresa inmobiliaria de confianza en la Comunidad Valenciana. 
              Expertos en hacer realidad tus sueños inmobiliarios.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-400 hover:text-orange-600">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/propiedades" className="text-gray-400 hover:text-orange-600">
                  Propiedades
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="text-gray-400 hover:text-orange-600">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-gray-400 hover:text-orange-600">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-400 hover:text-orange-600">
                  Contacto
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold mb-6">Servicios</h3>
            <ul className="space-y-4">
              <li className="text-gray-400">Compra y Venta</li>
              <li className="text-gray-400">Valoraciones</li>
              <li className="text-gray-400">Asesoramiento Legal</li>
              <li className="text-gray-400">Financiación</li>
              <li className="text-gray-400">Reformas</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-400">
                <Phone className="w-5 h-5 mr-3 text-orange-600" />
                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hover:text-orange-600">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="w-5 h-5 mr-3 text-orange-600" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-orange-600">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start text-gray-400">
                <MapPin className="w-5 h-5 mr-3 text-orange-600 mt-1" />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-start text-gray-400">
                <Clock className="w-5 h-5 mr-3 text-orange-600 mt-1" />
                <div>
                  <p>Atención: {contactInfo.officeHours}</p>
                  <p>Oficina: {contactInfo.businessHours}</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-8 pb-4">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img 
                src="/images/Plan de Resilencia.png"
                alt="Plan de Recuperación, Transformación y Resiliencia"
                className="h-16 object-contain"
              />
              <img 
                src="/images/ES-Financiado por la Unión Europea-POS.png"
                alt="Financiado por la Unión Europea"
                className="h-16 object-contain"
              />
              <p className="text-gray-400 text-sm max-w-md text-center md:text-left">
                Proyecto financiado por la Unión Europea - NextGenerationEU. Plan de Recuperación, Transformación y Resiliencia
              </p>
            </div>
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Gesttiona. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}