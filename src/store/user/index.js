import { setState } from '../utils'
import http from '@/services/http/index'
import chatService from '@/services/chat/index'

const state = {
  loggedIn: false,
  token: null,
  id: null,
  groups: null,
  stompClient: null
}

const mutations = {
  SET_STATE(state, data) {
    setState(state, data)
  },
  SET_STATUS(state, value) {
    state.loggedIn = value
  }
}

const actions = http => ({
  async logIn({ commit, dispatch }, credentials) {
    try {
      const { data } = await http.user.logIn(credentials)
      const { layouts } = data

      commit('SET_STATUS', true)
      commit('SET_STATE', data)
      commit('settings/SET_STATE', { layouts }, { root: true })

      await dispatch('socketConnection', data.id)

      return Promise.resolve()
    } catch (err) {
      return Promise.reject(err)
    }
  },
  async fetchGroups({ commit }) {
    try {
      const { data: groups } = await http.group.getGroups()

      commit('SET_STATE', { groups })
    } catch (e) {
      console.log(e)
    }
  },
  async socketConnection({ commit }, id) {
    try {
      const stompClient = chatService.connect(id)

      commit('SET_STATE', { stompClient })
    } catch (error) {
      console.log(error)
    }
  }
})

const getters = {
  getGroup: state => id => state.groups.find(el => el.group.id === id)
}

export default {
  state,
  mutations,
  actions: actions(http),
  getters,
  namespaced: true
}
