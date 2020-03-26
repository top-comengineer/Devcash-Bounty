export const state = () => ({
  dt: true
});

export const mutations = {
  change(state) {
    state.dt = !state.dt;
  }
};

export const actions = {
  change(context) {
    context.commit("change");
  }
};
