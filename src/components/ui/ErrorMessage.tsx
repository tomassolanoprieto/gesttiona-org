import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import type { PropertyApiError } from '../../lib/api/properties/types';

interface ErrorMessageProps {
  error: PropertyApiError;
  onRetry?: () => void;
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-20 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <AlertCircle className="w-12 h-12 text-red-600 mb-4" />
      <p className="text-red-600 mb-4">{error.message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Intentar de nuevo
        </button>
      )}
    </motion.div>
  );
}