import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

export default ({store}) => {
    window.onNuxtReady(() => {
        createPersistedState({
            key: 'vuex-devcash',
            paths: ['devcashData'],
            storage: {
                getItem: key => Cookies.get(key),
                setItem: (key, value) => Cookies.set(key, value, { expires: 365, secure: process.env.NODE_ENV === 'production' }),
                removeItem: key => Cookies.remove(key)
            }        
        })(store)
    })
}