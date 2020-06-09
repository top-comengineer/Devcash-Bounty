
import * as Cookies from "js-cookie"

// Devcash-related data
export const state = () => ({
    loggedInAccount: null,
    provider: null,
    bounties: {}
  });

  export const mutations = {
    setLoggedInAccount(state, account) {
      state.loggedInAccount = account
      if (state.loggedInAccount == null) {
        Cookies.remove("devcash_lia")
      } else {
        Cookies.set("devcash_lia", state.loggedInAccount, { expires: 14, secure: process.env.NODE_ENV === 'production' })
      }
    },
    setProvider(state, provider) {
      state.provider = provider
      if (state.provider == null) {
        Cookies.remove("devcash_provider")
      } else {
        Cookies.set("devcash_provider", state.provider, { expires: 14, secure: process.env.NODE_ENV === 'production' })
      }      
    },
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