import { Store } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
        key: 'vuex-devcashls',
        paths: ['devcashData'],
        storage: {
            getItem: (key) => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: (key) => ls.remove(key),
        },
    })(store)
  })
}