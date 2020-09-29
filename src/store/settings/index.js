// import defaultLayout from './defaultLayout'
import http from '@/services/http/index'
import { setState } from '../utils'

const state = {
  activeLayout: null,
  layouts: []
}

const mutations = {
  SET_STATE(state, data) {
    setState(state, data)
  },
  ADD_LAYOUT(state, layout) {
    state.layouts.push(layout)
  },
  SET_ACTIVE_LAYOUT(state, index = 0) {
    state.activeLayout = index
  },
  DELETE_LAYOUT(state, name) {
    const index = state.layouts.findIndex(el => el.name === name)

    if (index >= 0) state.layouts.splice(index, 1)
  },
  REMOVE_GROUP_FROM_LAYOUT(state, { id, index }) {
    const idx = state.layouts[index].groups.findIndex(el => el.i === id)
    if (idx >= 0) state.layouts[index].groups.splice(idx, 1)
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
  },
  async deleteLayout({ commit }, name) {
    try {
      await http.user.deleteLayout(name)

      commit('DELETE_LAYOUT', name)
    } catch (error) {
      console.log(error)
    }
  },
  async editLayout({ commit }, layout) {
    try {
      await http.user.editLayout(layout)
    } catch (error) {
      console.log(error)
    }
  },
  async removeGroupFromLayouts({ state, commit, dispatch }, id) {
    try {
      const allLayouts = state.layouts.map((layout, index) => {
        layout.groups.findIndex(el => el.i === id)
        commit('REMOVE_GROUP_FROM_LAYOUT', { id, index })
        return dispatch('editLayout', layout)
      })
      await Promise.all(allLayouts)
    } catch (error) {
      console.log(error)
    }
  }
})

const getters = {
  getActiveLayout: state =>
    state.layouts.length && state.activeLayout !== null
      ? state.layouts[state.activeLayout]
      : { name: '', groups: [] }
}

export default {
  state,
  mutations,
  actions: actions(http),
  getters,
  namespaced: true
}
