import Cookies from 'universal-cookie';
import resource from './en-0Hbq7Km1.mjs';
import resource$1 from './ja-CPx3Xk3t.mjs';

new Cookies();
const jaLanguage = "ja";
const enLanguage = "en";
const defaultLanguage = jaLanguage;
const nuxtI18nOptions = {
  strategy: "prefix_and_default",
  locales: [
    {
      code: jaLanguage,
      language: "ja-JP",
      file: "ja.json",
      isCatchallLocale: true
    },
    {
      code: enLanguage,
      language: "en-US",
      file: "en.json"
    }
  ],
  defaultLocale: defaultLanguage,
  customRoutes: "config",
  pages: {
    api: false,
    server: false
  },
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: "i18n_redirected",
    redirectOn: "root",
    // recommended
    alwaysRedirect: true,
    cookieCrossOrigin: true,
    fallbackLocale: defaultLanguage
  },
  vueI18n: "#base/i18n/i18n.config.ts"
};
const i18n_config = {
  legacy: false,
  locale: defaultLanguage,
  messages: {
    ja: resource$1,
    en: resource
  }
};

export { i18n_config as default, nuxtI18nOptions };
//# sourceMappingURL=i18n.config-pVtsSx9B.mjs.map
