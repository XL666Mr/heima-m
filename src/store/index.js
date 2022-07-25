import Vue from 'vue'
import Vuex from 'vuex'
import {
  getToken,
  setToken,
  getHistoryItem,
  setHistoryItem,
  removeHistoryItem
} from '@/utils'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    token: getToken() || {},
    historyItem: getHistoryItem() || [],
    idArray: Number,
    urlphoto: []
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
      setToken(payload)
    },
    sethistoryItem (state, payload) {
      state.historyItem.unshift(payload)
      state.historyItem = [...new Set(state.historyItem)]
      setHistoryItem(state.historyItem)
    },
    delhistoryItem (state, payload) {
      state.historyItem = state.historyItem.filter((ele) => ele !== payload)
      setHistoryItem(state.historyItem)
    },
    removehistoryItem (state) {
      state.historyItem = []
      removeHistoryItem()
    },
    setidArray (state, i) {
      state.idArray = i
    },
    seturlphoto (state, i) {
      state.urlphoto = i
    }
  }
})
