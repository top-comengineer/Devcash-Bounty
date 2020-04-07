import { LOCALES, DEFAULT_LOCALE } from '~/config'

export const state = () => ({
    locales: LOCALES,
    currentLocale: DEFAULT_LOCALE
  });
  
  export const mutations = {
    setLocale(state, locale) {
        state.currentLocale = locale
    }
  };
  
  export const actions = {
    setLocale(context, locale) {
        context.commit('setLocale', locale)
    }
  };
  
  export const getters = {
    currentLocale(state) {
        return state.currentLocale;
    },
    currentLocaleName(state) {
      let l
      for (l of LOCALES) {
        if (l.code == state.currentLocale) {
          return l.name
        }
      }
      return "Unknown"
    }
  };