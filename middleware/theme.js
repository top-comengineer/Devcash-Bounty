export default function ({ req, store }) {
  // See if theme is in cookie
  if (req && 'cookies' in req) {
    if (req.cookies.devcash_theme === 'light') {
        store.dispatch('theme/change')
    }
  }
} 