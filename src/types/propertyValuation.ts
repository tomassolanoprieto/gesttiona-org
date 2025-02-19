import type { ValenciaLocation, PropertyType } from '../lib/constants';

export interface PropertyValuationData {
  propertyType: PropertyType;
  location: ValenciaLocation;
  cadastralReference: string;
  fullName: string;
  email: string;
  phone: string;
}