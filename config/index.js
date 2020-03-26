// i18n messages
const en = require('../locales/en')
const fr = require('../locales/fr')

// i18n config
export const LOCALES = [
  {
    code: 'en',
    iso: 'en-US',
    name: 'English'
  },
  {
    code: 'fr',
    iso: 'fr-FR',
    name: 'French'
  }
]
export const DEFAULT_LOCALE = 'en'
export const I18N = {
  en,
  fr
}

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
}

export const THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
}

export const DEFAULT_THEME = THEMES.DARK