import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface AdminCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  actions: Array<{
    label: string;
    path: string;
    primary?: boolean;
  }>;
}

export function AdminCard({ title, description, icon: Icon, actions }: AdminCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Icon className="w-6 h-6 text-orange-600" />
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="space-y-2">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.path}
            className={`block w-full text-center py-2 px-4 rounded-lg transition-colors ${
              action.primary
                ? 'bg-orange-600 text-white hover:bg-orange-700'
                : 'text-gray-600 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}