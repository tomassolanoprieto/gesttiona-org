import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LoginForm } from '../../components/admin/LoginForm';
import { AdminPanel } from './AdminPanel';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export function AdminDashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <LoginForm />;
  }

  return <AdminPanel />;
}