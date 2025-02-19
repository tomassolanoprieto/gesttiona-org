export const OPERATION_TYPES = [
  { value: '', label: 'Compra o Alquiler' },
  { value: 'venta', label: 'Compra' },
  { value: 'alquiler', label: 'Alquiler' }
] as const;

export type OperationType = typeof OPERATION_TYPES[number]['value'];