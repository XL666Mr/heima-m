import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    token: getToken() || {}
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
      setToken(payload)
    }
  }
})
