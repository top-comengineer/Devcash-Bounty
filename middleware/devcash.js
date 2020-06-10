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
    }
  } 