import * as Cookies from "js-cookie"

export const state = () => ({
  dt: true
});

export const mutations = {
  change(state) {
    state.dt = !state.dt;
    if (state.dt) {
      Cookies.set("devcash_theme", "dark", { expires: 365, secure: process.env.NODE_ENV === 'production' })
    } else {
      Cookies.set("devcash_theme", "light", { expires: 365, secure: process.env.NODE_ENV === 'production' })
    }
  }
};

export const actions = {
  change(context) {
    context.commit("change");
  }
};
