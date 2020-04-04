import { formatDistance } from 'date-fns';
import { de, nl } from 'date-fns/locale';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import locales from './locales';

const lngs = {
  de: de,
  nl: nl
};

i18n.use(initReactI18next).init({
  interpolation: {
    format: function(value, format, lng) {
      if (format === 'date') {
        return formatDistance(value, Date.now(), {
          locale: lngs[lng] || null
        });
      }
      return value;
    }
  },
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  resources: locales
});

export default i18n;
