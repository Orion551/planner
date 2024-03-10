// Core i18next library
import i18n from 'i18next';
// Bindings for React: allow components to re-render when language changes
import { initReactI18next } from 'react-i18next';

export default i18n
  .use(initReactI18next) // Add React bindings as a plugin
  .init({
    // Config opts
    // Default lang
    lng: 'en',
    // Fallback lang
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      // English
      en: {
        translation: {
          calendar: 'Calendar',
        },
      },
      it: {
        translation: {
          calendar: 'Calendario',
        },
      },
    },
  });
