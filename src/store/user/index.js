import { setState } from '../utlils'
import http from '@/services/http/index'

const state = {
  loggedIn: false,
  token: null,
  id: null,
  groups: null
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
  async logIn({ commit }, credentials) {
    try {
      const { data } = await http.user.logIn(credentials)

      commit('SET_STATUS', true)
      commit('SET_STATE', data)

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
