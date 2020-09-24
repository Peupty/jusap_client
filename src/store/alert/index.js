import { setState } from '../utils'

const state = {
  alerts: []
}

const mutations = {
  SET_STATE(state, data) {
    setState(state, data)
  },
  ADD_ALERT(state, alert) {
    state.alerts.push(alert)
  },
  REMOVE_ALERT(state, alert) {
    state.alerts.splice(alert, 1)
  }
}

const actions = {
  display({ commit }, alert) {
    return new Promise(resolve => {
      commit('ADD_ALERT', alert)

      setTimeout(() => {
        commit('REMOVE_ALERT', alert)
        resolve()
      }, 1500)
    })
  }
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
