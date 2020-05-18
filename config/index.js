// i18n messages
const en = require("../locales/en");
const zhHans = require("../locales/zh-Hans");

// i18n config
module.exports.LOCALES = [
  {
    code: "en",
    iso: "en-US",
    name: "English"
  },
  {
    code: "zhHans",
    iso: "zh-Hans",
    name: "简化字"
  }
];
module.exports.DEFAULT_LOCALE = "en";
module.exports.I18N = {
  en,
  zhHans
};

// Define custom paths for localized routes
// If a route/locale is omitted, defaults to Nuxt's generated path
module.exports.ROUTES_ALIASES = {
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

module.exports.SIDEBAR_CONTEXTS = {
  explore: "explore",
  singleBounty: "singleBounty",
  post: "post",
  overview: "overview",
  bountyHunter: "bountyHunter",
  bountyManager: "bountyManager"
};
