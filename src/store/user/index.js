import { setState } from '../utils'
import http from '@/services/http/index'
import chatService from '@/services/chat/index'

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
  },
  ADD_POSTS(state, { id, data }) {
    state.groups.find(el => el.group.id === id).posts.push(...data)
  },
  REFRESH_GROUP(state, { id, data }) {
    state.groups.find(el => el.group.id === id).posts = data
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
  async fetchPosts({ commit }, { id, page }) {
    try {
      const { data } = await http.group.getPosts(id, page)

      if (page < data.totalPages) {
        commit('ADD_POSTS', { data: data.content, id })
      }
    } catch (error) {
      console.log(error)
    }
  },
  async refreshGroup({ commit }, id) {
    try {
      const { data } = await http.group.getPosts(id, 1)

      commit('REFRESH_GROUP', { data: data.content, id })
    } catch (error) {
      console.log(error)
    }
  },
  async socketConnection({ commit }, id) {
    try {
      const stompClient = chatService.connect(id)

      commit('chats/SET_STATE', { stompClient }, { root: true })
    } catch (error) {
      console.log(error)
    }
  },
  async fetchUser({ commit }, id) {
    // To Do
    const er = new Error('asda')

    return Promise.reject(er)
  }
})

const getters = {
  getGroup: state => id => state.groups.find(el => el.group.id === id),
  loggedIn: state => state.loggedIn
}

export default {
  state,
  mutations,
  actions: actions(http),
  getters,
  namespaced: true
}
