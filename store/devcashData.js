// Devcash-related data
export const state = () => ({
    loggedInAccount: null,
    provider: null,
    bounties: {}
  });

  export const mutations = {
    setLoggedInAccount(state, account) {
      state.loggedInAccount = account
    },
    setProvider(state, provider) {
      state.provider = provider
    },
    setBounties(state, bounties) {
      bounties.forEach(bounty => {
        state.bounties[bounty.id] = bounty
      })
    }
  };
  
  export const actions = {
    setLoggedInAccount(context, account) {
      context.commit("setLoggedInAccount", account)
    },
    setProvider(context, provider) {
      context.commit('setProvider', provider)
    }
  };
  
  export const getters = {
    isLoggedIn(state) {
      return state.loggedInAccount != null
    },
    loggedInAccount(state) {
      return state.loggedInAccount
    }
  }