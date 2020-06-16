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
    }
  } 