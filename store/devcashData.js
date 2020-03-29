// Devcash-related data
export const state = () => ({
    loggedInAccount: null
  });

  export const mutations = {
    setLoggedInAccount(state, account) {
      state.loggedInAccount = account;
    }
  };
  
  export const actions = {
    setLoggedInAccount(context, account) {
      context.commit("setLoggedInAccount", account);
    }
  };
  