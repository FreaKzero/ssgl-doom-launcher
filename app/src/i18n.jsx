import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import locales from './locales';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: true,
  resources: locales
});

export default i18n;
