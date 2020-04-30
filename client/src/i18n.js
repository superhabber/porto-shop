import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import blocks_en from "./translations/en/blocks.json";
import index_en from "./translations/en/index.json";

import blocks_ua from "./translations/ua/blocks.json";
import index_ua from "./translations/ua/index.json";

i18n

  .use(LanguageDetector)

  .use(initReactI18next)

  .init({
    lng: 'en',
    debug: true,
    resources: {
      en: {
        // common: common_en,
        translation: {
          blocks: blocks_en,
          index: index_en
        }
      },
      ua: {
        translation: {
          blocks: blocks_ua,
          index: index_ua
        }
      }
    }
  });

export default i18n;