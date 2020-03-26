import { THEMES, DEFAULT_THEME } from '~/config'

export const state = () => ({
    themes: THEMES,
    currentTheme: DEFAULT_THEME
  });
  
  export const mutations = {
    setTheme(state, theme) {
        state.currentTheme = theme
    }
  };
  
  export const actions = {
    setTheme(context, theme) {
        context.commit('setTheme', theme)
    }
  };
  
  export const getters = {
    currentTheme(state) {
        return state.currentTheme;
    },
    dark(state) {
        return state.currentTheme == THEMES.DARK
    },
    dt(state) {
        return state.currentTheme == THEMES.DARK
    }
  };