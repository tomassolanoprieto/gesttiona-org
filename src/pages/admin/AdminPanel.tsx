import React from 'react';
import { motion } from 'framer-motion';
import { Building2, FileText, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { signOut } from '../../lib/supabase/auth';
import { AdminCard } from '../../components/admin/AdminCard';

const adminSections = [
  {
    title: 'Propiedades',
    description: 'Gestiona el catálogo de propiedades',
    icon: Building2,
    actions: [
      {
        label: 'Añadir Propiedad',
        path: '/admin/properties/new',
        primary: true
      },
      {
        label: 'Ver Propiedades',
        path: '/admin/properties'
      }
    ]
  },
  {
    title: 'Blog',
    description: 'Gestiona los artículos del blog',
    icon: FileText,
    actions: [
      {
        label: 'Añadir Artículo',
        path: '/admin/blog/new',
        primary: true
      },
      {
        label: 'Ver Artículos',
        path: '/admin/blog'
      }
    ]
  }
];

export function AdminPanel() {
  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.reload();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Panel de Administración</h1>
            <p className="text-gray-600 mt-2">Gestiona el contenido de tu sitio web</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Cerrar sesión
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <AdminCard {...section} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}