// import defaultLayout from './defaultLayout'
import http from '@/services/http/index'
import { setState } from '../utils'

const state = {
  activeLayout: { name: '', groups: [] },
  layouts: []
}

const mutations = {
  SET_STATE(state, data) {
    setState(state, data)
  },
  ADD_LAYOUT(state, layout) {
    state.layouts.push(layout)
  },
  SET_ACTIVE_LAYOUT(state, index) {
    if (index) state.activeLayout.groups = state.layouts[index]
    else state.activeLayout = state.layouts[state.layouts.length - 1]
  }
}

const actions = http => ({
  async createLayout({ commit }, layout) {
    try {
      await http.user.createLayout(layout)

      commit('ADD_LAYOUT', layout)
      commit('SET_ACTIVE_LAYOUT')
    } catch (error) {
      console.log(error)
    }
  }
})

export default {
  state,
  mutations,
  actions: actions(http),
  namespaced: true
}
