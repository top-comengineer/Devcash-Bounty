// i18n messages
const en = require("../locales/en");
const zh = require("../locales/zh");

// i18n config
export const LOCALES = [
  {
    code: "en",
    iso: "en-US",
    name: "English",
  },
  {
    code: "zh",
    iso: "zh",
    name: "Chinese",
  },
];
export const DEFAULT_LOCALE = "en";
export const I18N = {
  en,
  zh,
};

// Define custom paths for localized routes
// If a route/locale is omitted, defaults to Nuxt's generated path
export const ROUTES_ALIASES = {
  /*
  about: {
    fr: '/a-propos',
    en: '/about-us'
  },
  category: {
    fr: '/categorie'
  },
  'category-slug': {
    fr: '/categorie/:slug'
  }*/
};

export const SIDEBAR_CONTEXTS = {
  explore: "explore",
  single: "singleBounty",
  post: "post",
};
