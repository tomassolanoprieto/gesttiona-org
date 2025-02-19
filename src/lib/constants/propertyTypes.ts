export const PROPERTY_TYPES = [
  { value: '', label: 'Todos los tipos' },
  { value: 'pisos', label: 'Pisos' },
  { value: 'casas', label: 'Casas' },
  { value: 'chalets', label: 'Chalets' },
  { value: 'aticos', label: 'Áticos' },
  { value: 'obra-nueva', label: 'Obra Nueva' },
  { value: 'locales', label: 'Locales' },
  { value: 'oficinas', label: 'Oficinas' },
  { value: 'naves', label: 'Naves' },
  { value: 'edificios', label: 'Edificios' },
  { value: 'garajes', label: 'Garajes' }
] as const;

export type PropertyType = typeof PROPERTY_TYPES[number]['value'];