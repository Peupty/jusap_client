import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/index'
import settings from './settings/index'
import chats from './chats/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    settings,
    chats
  }
})
