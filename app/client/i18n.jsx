import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import locales from './locales';
import { formatDistance } from 'date-fns';
import { en, de, ru } from 'date-fns/locale';

const lngs = {
  en: en,
  de: de,
  ru: ru
};

i18n.use(initReactI18next).init({
  interpolation: {
    format: function(value, format, lng) {
      if (format === 'date') {
        return formatDistance(value, Date.now(), {
          locale: lngs[lng]
        });
      }
      return value;
    }
  },
  lng: 'en',
  fallbackLng: 'en',
  debug: true,
  resources: locales
});

export default i18n;
