import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
        key: 'vuex-devcash',
        paths: ['theme']
    })(store)
  })
}