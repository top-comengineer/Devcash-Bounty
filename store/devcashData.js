
import * as Cookies from "js-cookie"
import { utils } from "ethers"

const ethSymbol = "Ξ"
const devcashSymbol = "{D}"

// Devcash-related data
export const state = () => ({
  loggedInAccount: null,
  provider: null,
  bounties: {},
  ethIsPrimary: false,
  balancePrimary: {},
  balanceSecondary: {},
  fee: null,
  curFee: null,
  isIBOBarClosed: false,
  submissionFormData: {},
  pendingSubStatus: [],
  currentSortType: 'recency',
  orderDirection: 'desc',
  exploreStatus: {
    active: true,
    completed: true,
    expired: true
  },
  exploreSearchText: '',
  exploreCategories: {
    create: true,
    enhance: true,
    bug: true,
    support: true,
    prototype: true,
    other: true
  }
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
  setSortType(state, type) {
    state.currentSortType = type
    if (state.currentSortType != "value" && state.currentSortType != "expiry" && state.currentSortType != "recency") {
      Cookies.remove("devcash_estype")
      state.currentSortType = "recency"
    } else {
      Cookies.set("devcash_estype", state.currentSortType, { expires: 365, secure: process.env.NODE_ENV === 'production' })
    }
  },  
  setSortDirection(state, direction) {
    state.orderDirection = direction
    if (state.orderDirection != "desc" && state.orderDirection != "asc") {
      Cookies.remove("devcash_esdirection")
      state.orderDirection = "desc"
    } else {
      Cookies.set("devcash_esdirection", state.orderDirection, { expires: 365, secure: process.env.NODE_ENV === 'production' })
    }
  },
  setStatus(state, status) {
    state.exploreStatus = status
    if (!'active' in state.exploreStatus && !'completed' in state.exploreStatus && !'expired' in state.exploreStatus) {
      Cookies.remove("devcash_explorestatus")
      state.exploreStatus = {
        active: true,
        completed: true,
        expired: true
      }
    } else {
      Cookies.set("devcash_explorestatus", JSON.stringify(state.exploreStatus), { expires: 365, secure: process.env.NODE_ENV === 'production' })
    }
  },
  setCategories(state, categories) {
    state.exploreCategories = categories
    if (!'create' in state.exploreCategories && !'enhance' in state.exploreCategories && !'bug' in state.exploreCategories &&
    !'support' in state.exploreCategories && !'prototype' in state.exploreCategories && !'other' in state.exploreCategories) {
      Cookies.remove("devcash_explore_category")
      state.exploreCategories = {
        create: true,
        enhance: true,
        bug: true,
        support: true,
        prototype: true,
        other: true
      }
    } else {
      Cookies.set("devcash_explore_category", JSON.stringify(state.exploreCategories), { expires: 365, secure: process.env.NODE_ENV === 'production' })
    }
  },   
  setEthereum(state) {
    if (!state.ethIsPrimary) {
      state.ethIsPrimary = true
      let primary = state.balancePrimary
      let secondary = state.balanceSecondary
      state.balancePrimary = secondary
      state.balanceSecondary = primary
      Cookies.set("devcash_ethereum", "true", { expires: 365, secure: process.env.NODE_ENV === 'production' })
    }
  },
  setDevcash(state) {
    if (state.ethIsPrimary) {
      state.ethIsPrimary = false
      let primary = state.balancePrimary
      let secondary = state.balanceSecondary
      state.balancePrimary = secondary
      state.balanceSecondary = primary
      Cookies.set("devcash_ethereum", "false", { expires: 365, secure: process.env.NODE_ENV === 'production' })
    }
  },
  closeIBOBar(state) {
    state.isIBOBarClosed = true
  },
  setBalance(state, balance) {
    if (balance == null) {
      Cookies.remove("devcash_balance")
    } else {
      if (state.ethIsPrimary) {
        state.balancePrimary = {
          hasApproved: false,
          symbol: ethSymbol,
          amount: balance.eth,
          raw: balance.ethRaw
        }
        state.balanceSecondary = {
          hasApproved: true,
          symbol: devcashSymbol,
          amount: balance.devcash,
          raw: balance.devcashRaw,
          approved: balance.approved,
          approvedRaw: balance.approvedRaw
        }
      } else {
        state.balanceSecondary = {
          hasApproved: false,
          symbol: ethSymbol,
          amount: balance.eth,
          raw: balance.ethRaw
        }
        state.balancePrimary = {
          hasApproved: true,
          symbol: devcashSymbol,
          amount: balance.devcash,
          raw: balance.devcashRaw,
          approved: balance.approved,
          approvedRaw: balance.approvedRaw
        }
      }
      Cookies.set("devcash_balance", JSON.stringify({ account: state.loggedInAccount, balances: balance }), { expires: 365, secure: process.env.NODE_ENV === 'production' })
      // Update fee
      if (state.fee) {
        let rawBal
        if (state.ethIsPrimary) {
          rawBal = utils.bigNumberify(state.balanceSecondary.raw)
        } else {
          rawBal = utils.bigNumberify(state.balancePrimary.raw)
        }
        let rawWaiver = utils.parseUnits(state.fee.waiver.toString(), 8)
        if (rawBal.gte(rawWaiver)) {
          state.curFee = "0"
        } else {
          state.curFee = state.fee.fee
        }
      }
    }
  },
  setFees(state, fee) {
    state.fee = fee
    if (fee == null) {
      Cookies.remove("devcash_fee")
    } else {
      Cookies.set("devcash_fee", JSON.stringify(fee), { expires: 365, secure: process.env.NODE_ENV === 'production' })
      // Update fee
      let rawBal
      if (state.ethIsPrimary && state.balanceSecondary.raw) {
        rawBal = utils.bigNumberify(state.balanceSecondary.raw)
      } else if (!state.ethIsPrimary && state.balancePrimary.raw) {
        rawBal = utils.bigNumberify(state.balancePrimary.raw)
      }
      if (rawBal) {
        let rawWaiver = utils.parseUnits(state.fee.waiver.toString(), 8)
        if (rawBal.gte(rawWaiver)) {
          state.curFee = "0"
        } else {
          state.curFee = state.fee.fee
        }
      }
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
  },
  async updateFees(context, client) {
    context.commit("setFees", { fee: await client.getFee(), waiver: await client.getWaiver() })
  }
};

export const getters = {
  isLoggedIn(state) {
    return state.loggedInAccount != null
  },
  loggedInAccount(state) {
    return state.loggedInAccount
  },
  exploreSortType(state) {
    return state.currentSortType
  },
  exploreOrderDirection(state) {
    return state.orderDirection
  },
  exploreStatus(state) {
    return state.exploreStatus
  },
  exploreCategories(state) {
    return state.exploreCategories
  },
  getBalance(state) {
    if (state.loggedInAccount != null) {
      if (state.balancePrimary && state.balanceSecondary) {
        return {
          primary: state.balancePrimary,
          secondary: state.balanceSecondary
        }
      }
      let cacheBalance = Cookies.get("devcash_balance")
      if (cacheBalance) {
        let parsed = JSON.parse(cacheBalance)
        if ("primary" in parsed && "secondary" in parsed) {
          return {
            primary: parsed.primary,
            secondary: parsed.secondary
          }
        }
      }
    }
    return {
      primary: {},
      secondary: {}
    }
  },
  getFees(state) {
    if (state.loggedInAccount != null) {
      if (state.fee) {
        return state.fee
      }
      let cacheFee = Cookies.get("devcash_fee")
      if (cacheFee) {
        return JSON.parse(cacheFee)
      }
    }
    return null
  },
  getCurFee(state) {
    return state.curFee || "N/A"
  }
}