import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NavLinkProps {
  path: string;
  onClick: () => void;
  children: React.ReactNode;
}

export function NavLink({ path, onClick, children }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === path;
  const isExternal = path.startsWith('http');

  return (
    <motion.button
      onClick={onClick}
      className={`text-white hover:text-orange-400 transition-colors text-lg ${
        isActive ? 'text-orange-400' : ''
      }`}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.button>
  );
}