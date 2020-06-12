
import * as Cookies from "js-cookie"

const ethCurrency = {
  symbol: "ETH"
}

const devcashCurrency = {
  symbol: "{D}"
}

// Devcash-related data
export const state = () => ({
  loggedInAccount: null,
  provider: null,
  bounties: {},
  currency: devcashCurrency,
  balance: null,
  isIBOBarClosed: false
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
  setEthereum(state) {
    state.currency = ethCurrency
    Cookies.set("devcash_ethereum", "true", { expires: 365, secure: process.env.NODE_ENV === 'production' })
  },
  setDevcash(state) {
    state.currency = devcashCurrency
    Cookies.set("devcash_ethereum", "false", { expires: 365, secure: process.env.NODE_ENV === 'production' })
  },
  closeIBOBar(state) {
    state.isIBOBarClosed = true
  },
  setBalance(state, balance) {
    state.balance = balance
    if (balance == null) {
      Cookies.remove("devcash_balance")
    } else {
      Cookies.set("devcash_balance", JSON.stringify({ account: state.loggedInAccount, balances: balance }), { expires: 365, secure: process.env.NODE_ENV === 'production' })
    }
  }
};

export const actions = {
  setLoggedInAccount(context, account) {
    context.commit("setLoggedInAccount", account)
  },
  setProvider(context, provider) {
    context.commit('setProvider', provider)
  },
  setEthereum(context) {
    context.commit("setEthereum")
  },
  setDevcash(context) {
    context.commit("setEthereum")
  },
  closeIBOBar(context) {
    context.commit("closeIBOBar")
  },
  async updateBalance(context, client) {
    context.commit("setBalance", await client.getBalances())
  }
};

export const getters = {
  isLoggedIn(state) {
    return state.loggedInAccount != null
  },
  loggedInAccount(state) {
    return state.loggedInAccount
  },
  getBalance(state) {
    if (state.loggedInAccount != null) {
      if (state.balance) {
        return state.balance
      }
      let cacheBalance = Cookies.get("devcash_balance")
      if (cacheBalance) {
        dispatch("devcashData/updateBalance")
        return JSON.parse(cacheBalance).balances
      }
    }
    return null
  }
}