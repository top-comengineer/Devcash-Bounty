export default function ({ req, store }) {
    // See if theme is in cookie
    if (req && 'cookies' in req) {
      if (req.cookies.devcash_provider !== undefined) {
        store.dispatch('devcashData/setProvider', req.cookies.devcash_provider)
      }
      if (req.cookies.devcash_lia !== undefined) {
        store.dispatch('devcashData/setLoggedInAccount', req.cookies.devcash_lia)
      }
      if (req.cookies.devcash_ethereum === "true") {
        store.dispatch('devcashData/setEthereum')
      }
      if (req.cookies.devcash_balance) {
        let parsed = JSON.parse(req.cookies.devcash_balance)
        if (parsed.account == req.cookies.devcash_lia) {
          store.commit('devcashData/setBalance', parsed.balances)
        }
      }
      if (req.cookies.devcash_fee) {
        let parsed = JSON.parse(req.cookies.devcash_fee)
        store.commit('devcashData/setFees', parsed)
      }
      if (req.cookies.devcash_estype) {
        store.commit('devcashData/setSortType', req.cookies.devcash_estype)
      }
      if (req.cookies.devcash_esdirection) {
        store.commit('devcashData/setSortDirection', req.cookies.devcash_esdirection)
      }      
      if (req.cookies.devcash_explorestatus) {
        let parsed = JSON.parse(req.cookies.devcash_explorestatus)
        store.commit('devcashData/setStatus', parsed)
      }
      if (req.cookies.devcash_explore_category) {
        let parsed = JSON.parse(req.cookies.devcash_explore_category)
        store.commit('devcashData/setCategories', parsed)        
      }
    }
  } 