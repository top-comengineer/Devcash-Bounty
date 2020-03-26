export const state = () => ({
    dk: true
});
  
export const mutations = {
    change(state) {
        state.dk = !state.dk
    }
};

export const actions = {
    change(context) {
        context.commit('change')
    }
};
