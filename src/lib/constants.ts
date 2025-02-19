// Location Types
export const VALENCIA_LOCATIONS = [
  { value: '', label: 'Todas las zonas' },
  { 
    value: 'valencia-capital', 
    label: 'Valencia Capital',
    description: 'Toda la ciudad de Valencia'
  },
  { 
    value: 'horta-nord', 
    label: 'L\'Horta Nord',
    description: 'Albalat dels Sorells, Alboraya, Albuixech, Alfara del Patriarca, Almàssera, Burjassot, Emperador, Foios, Godella, Massalfassar, Massamagrell, Meliana, Moncada, Museros, Paterna, Pobla de Farnals, Puçol, Puig, Rafelbunyol, Rocafort, Tavernes Blanques, Vinalesa'
  },
  { 
    value: 'horta-sud', 
    label: 'L\'Horta Sud',
    description: 'Albal, Alcàsser, Alfafar, Benetússer, Catarroja, Llocnou de la Corona, Massanassa, Paiporta, Picanya, Sedaví, Silla'
  },
  { 
    value: 'horta-oest', 
    label: 'L\'Horta Oest',
    description: 'Alaquàs, Aldaia, Manises, Mislata, Paterna, Picanya, Quart de Poblet, Torrent, Xirivella'
  },
  { 
    value: 'camp-turia', 
    label: 'Camp de Túria',
    description: 'Benaguasil, Benisanó, Bétera, Casinos, Eliana, Gátova, Llíria, Loriguilla, Marines, Náquera, Olocau, Pobla de Vallbona, Riba-roja de Túria, San Antonio de Benagéber, Serra, Vilamarxant'
  },
  { 
    value: 'camp-morvedre', 
    label: 'Camp de Morvedre',
    description: 'Sagunto, Puerto de Sagunto y poblaciones cercanas'
  },
  { 
    value: 'ribera-alta', 
    label: 'Ribera Alta',
    description: 'Alzira, Carcaixent, Algemesí y poblaciones cercanas'
  },
  { 
    value: 'ribera-baixa', 
    label: 'Ribera Baixa',
    description: 'Cullera, Sueca, Sollana y poblaciones cercanas'
  },
  { 
    value: 'costera', 
    label: 'La Costera',
    description: 'Xàtiva, Canals y poblaciones cercanas'
  },
  { 
    value: 'vall-albaida', 
    label: 'Vall d\'Albaida',
    description: 'Ontinyent, Albaida y poblaciones cercanas'
  },
  { 
    value: 'safor', 
    label: 'La Safor',
    description: 'Gandia, Oliva y poblaciones cercanas'
  }
] as const;

// Property Types
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

// Operation Types
export const OPERATION_TYPES = [
  { value: '', label: 'Compra o Alquiler' },
  { value: 'venta', label: 'Compra' },
  { value: 'alquiler', label: 'Alquiler' }
] as const;

// Type Exports
export type ValenciaLocation = typeof VALENCIA_LOCATIONS[number]['value'];
export type PropertyType = typeof PROPERTY_TYPES[number]['value'];
export type OperationType = typeof OPERATION_TYPES[number]['value'];