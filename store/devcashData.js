// Devcash-related data
export const state = () => ({
    loggedInAccount: null,
    provider: null,
    bounties: null,
    lastRefresh: null
  });

  export const mutations = {
    setLoggedInAccount(state, account) {
      state.loggedInAccount = account
    },
    setBounties(state, bounties) {
      state.bounties = bounties
    },
    setLastRefresh(state, lastRefresh) {
      state.lastRefresh = lastRefresh
    }
  };
  
  export const actions = {
    setLoggedInAccount(context, account) {
      context.commit("setLoggedInAccount", account)
    },
    setBounties(context, bounties) {
      context.commit('setBounties', bounties)
    },
    setLastRefresh(context, lastRefresh) {
      context.commit('setLastRefresh', lastRefresh)
    }
  };
  
  export const getters = {
    getOpenBounties(state) {
      if (state.bounties == null) {
        return null
      }
      let result = []
      state.bounties.forEach((b) => {
        if (b.deadline == 0) {
          return
        } else if (b.hunter != "0x0000000000000000000000000000000000000000") {
          return
        }
        result.push(b)
      })
      return result
    },
    shouldRefresh(state) {
      if (state.lastRefresh == null) {
        return true
      }
      const curDate = new Date()
      if (curDate.getTime() - state.lastRefresh >= 300) {
        return true
      }
      return false
    }
  }