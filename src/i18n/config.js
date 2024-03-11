// Core i18next library
import i18n from 'i18next';
// Bindings for React: allow components to re-render when language changes
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from '@Assets/locales/en.json';
import itTranslation from '@Assets/locales/it.json';

export const supportedLangs = {
  en: 'English',
  it: 'Italian',
};

export default i18n
  .use(LanguageDetector)
  .use(initReactI18next) // Add React bindings as a plugin
  .init({
    fallbackLng: 'en',
    detection: {
      order: ['navigator'],
    },
    resources: {
      en: { translation: enTranslation },
      it: { translation: itTranslation },
    },
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });
