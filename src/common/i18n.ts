import i18next from "i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { I18nNamespace } from "../enums/i18nNamespace";
import { I18nLanguage } from "../enums/i18nLanguage";

const i18n = i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next);

i18n.init({
  debug: process.env.NODE_ENV === "development",
  whitelist: [I18nLanguage.ZH_CN, I18nLanguage.EN],
  fallbackLng: I18nLanguage.EN,
  ns: [I18nNamespace.App],
  defaultNS: I18nNamespace.App,
  backend: {
    loadPath: "/static/i18n/{{lng}}/{{ns}}.json",
  },
  detection: {
    lookupLocalStorage: "i18nextLng",
  },
});

export { i18n };
