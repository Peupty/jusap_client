import { setState } from '../utils'
import http from '@/services/http/index'
import ChatMessage from '@/classes/ChatMessage'
import Conversation from '@/classes/Conversation'

const state = {
  conversations: [],
  stompClient: null
}

const mutations = {
  SET_STATE(state, data) {
    setState(state, data)
  },
  CREATE_CONVERSATION(state, data) {
    state.conversations.push(new Conversation(data))
  },
  CLOSE_CONVERSATION(state, id) {
    const index = state.conversations.findIndex(el => el.id === id)
    state.conversations.splice(index, 1)
  },
  ADD_MESSAGE(state, data) {
    const index = state.conversations.findIndex(el => el.id === data.id)
    console.log(index)
    state.conversations[index].content.push(new ChatMessage(data))
  }
}

const actions = http => ({})

const getters = {}

export default {
  state,
  mutations,
  actions: actions(http),
  getters,
  namespaced: true
}
