import * as Cookies from "js-cookie"

export const strict = false

const availableThemes = ['dark', 'light']

export const state = () => ({
  theme: 'dark',
  sidebarContext: null
});

export const mutations = {
  changeTheme(state, theme) {
    if (!theme in availableThemes) {
      return
    }
    state.theme = theme
    Cookies.set("devcash_theme", theme, { expires: 365, secure: process.env.NODE_ENV === 'production' })
  },
  setSidebarContext(state, sbContext) {
    state.sidebarContext = sbContext;
  }  
};

export const actions = {
  setSidebarContext(context, sbContext) {
    context.commit("setSidebarContext", sbContext);
  }
};