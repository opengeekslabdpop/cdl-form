import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// english
import commonEN from "./locales/en/common.json";

const detectionOptions = {
  order: ["navigator"],
};

const resources = {
  en: {
    common: commonEN,
  },
};

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  detection: detectionOptions,
});

export default i18n;
