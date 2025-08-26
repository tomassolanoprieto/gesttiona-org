import React from 'react';
import { useEffect } from 'react';

export function PropertiesPage() {
  useEffect(() => {
    // Redirect to external properties site
    window.location.href = 'https://propiedades.gesttiona.org';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-600 border-t-transparent mx-auto mb-4"></div>
        <p className="text-gray-600">Redirigiendo a nuestras propiedades...</p>
      </div>
    </div>
  );
}
