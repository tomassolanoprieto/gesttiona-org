import CMS from 'decap-cms-app';
import { es } from 'decap-cms-locales';
import { config } from './config';

// Register Spanish locale
CMS.registerLocale('es', es);

// Initialize CMS with config
CMS.init({ config });