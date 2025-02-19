import { PropertyApiError } from './types';

export const PROPERTY_ERROR_MESSAGES = {
  FETCH_ERROR: 'Error al cargar las propiedades',
  CREATE_ERROR: 'Error al crear la propiedad',
  UPDATE_ERROR: 'Error al actualizar la propiedad',
  DELETE_ERROR: 'Error al eliminar la propiedad',
  NOT_FOUND: 'Propiedad no encontrada',
  UNAUTHORIZED: 'No autorizado. Por favor, inicia sesión',
  NETWORK_ERROR: 'Error de conexión. Por favor, verifica tu conexión a internet',
  PARSE_ERROR: 'Error al procesar los datos',
  UNKNOWN_ERROR: 'Ha ocurrido un error inesperado'
} as const;

export function createPropertyError(code: PropertyApiError['code'], status?: number): PropertyApiError {
  return {
    code,
    message: PROPERTY_ERROR_MESSAGES[code],
    status
  };
}