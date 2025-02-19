import { LucideIcon } from 'lucide-react';

export interface ContactMethod {
  icon: LucideIcon;
  title: string;
  description: string;
  value: string;
  href: string;
  color: string;
}