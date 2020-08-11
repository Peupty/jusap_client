// import defaultLayout from './defaultLayout'
import http from '@/services/http/index'

const state = {
  activeLayout: { name: '', groups: [] },
  layouts: []
}

const mutations = {
  ADD_LAYOUT(state, layout) {
    state.layouts.push(layout)
  },
  SET_ACTIVE_LAYOUT(state, index) {
    if (index) state.activeLayout = state.layouts[index].groups
    else state.activeLayout = state.layouts[state.layouts.length - 1].groups
  }
}

const actions = http => ({
  createLayout({ commit }, layout) {
    try {
      http.user.createLayout(layout)

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
