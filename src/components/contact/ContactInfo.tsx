import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { contactInfo } from '../../data/contact';
import { ContactMethod } from '../../types/contact';

const contactMethods: ContactMethod[] = [
  {
    icon: Phone,
    title: 'Teléfono',
    description: 'Llámanos para una atención inmediata',
    value: contactInfo.phone,
    href: `tel:${contactInfo.phone.replace(/\s/g, '')}`,
    color: 'bg-blue-50'
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'Escríbenos en cualquier momento',
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
    color: 'bg-green-50'
  },
  {
    icon: MapPin,
    title: 'Ubicación',
    description: 'Visítanos en nuestra oficina',
    value: contactInfo.address,
    href: `https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`,
    color: 'bg-purple-50'
  }
];

export function ContactInfo() {
  return (
    <div className="space-y-8">
      {contactMethods.map((method, index) => (
        <motion.a
          key={index}
          href={method.href}
          target={method.icon === MapPin ? '_blank' : undefined}
          rel={method.icon === MapPin ? 'noopener noreferrer' : undefined}
          className={`${method.color} p-6 rounded-xl hover:shadow-lg transition-all duration-300 block group`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-start space-x-4">
            <div className="bg-white p-3 rounded-full">
              <method.icon className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-600 transition-colors">
                {method.title}
              </h3>
              <p className="text-gray-600 mb-2">{method.description}</p>
              <p className="text-gray-800 font-medium">{method.value}</p>
            </div>
          </div>
        </motion.a>
      ))}

      <motion.div
        className="bg-gray-50 p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-orange-600" />
          Horario de Atención
        </h3>
        <div className="space-y-2 text-gray-600">
          <p>Atención al Cliente: {contactInfo.officeHours}</p>
          <p>Horario de Oficina: {contactInfo.businessHours}</p>
        </div>
      </motion.div>
    </div>
  );
}