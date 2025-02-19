import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, LogIn } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { PropertyForm } from './PropertyForm';
import { LoginForm } from '../admin/LoginForm';

interface AddPropertyButtonProps {
  className?: string;
}

export function AddPropertyButton({ className }: AddPropertyButtonProps) {
  const [showForm, setShowForm] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { user } = useAuth();

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setShowForm(true);
  };

  const handleClick = () => {
    if (user) {
      setShowForm(true);
    } else {
      setShowLogin(true);
    }
  };

  return (
    <>
      {/* Botón principal */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className={`fixed bottom-8 right-8 bg-orange-600 text-white p-4 rounded-full shadow-lg hover:bg-orange-700 transition-colors z-40 flex items-center justify-center ${className}`}
        title={user ? "Añadir propiedad" : "Iniciar sesión para añadir propiedades"}
      >
        {user ? <Plus className="w-6 h-6" /> : <LogIn className="w-6 h-6" />}
      </motion.button>

      {/* Modal de login */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={(e) => e.target === e.currentTarget && setShowLogin(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <LoginForm 
                onSuccess={handleLoginSuccess} 
                onClose={() => setShowLogin(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal del formulario de propiedad */}
      <AnimatePresence>
        {showForm && user && (
          <PropertyForm onClose={() => setShowForm(false)} />
        )}
      </AnimatePresence>
    </>
  );
}