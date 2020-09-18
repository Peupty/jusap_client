import { setState } from '../utils'
import http from '@/services/http/index'
import ChatMessage from '@/classes/ChatMessage'
import Conversation from '@/classes/Conversation'

const state = {
  conversations: [],
  openConversations: {},
  stompClient: null
}

const mutations = {
  SET_STATE(state, data) {
    setState(state, data)
  },
  CREATE_CONVERSATION(state, data) {
    if (!state.openConversations[data.id]) {
      state.conversations.push(new Conversation(data))
      state.openConversations[data.id] = true
    }
  },
  CLOSE_CONVERSATION(state, id) {
    const index = state.conversations.findIndex(el => el.id === id)
    state.conversations.splice(index, 1)
    delete state.openConversations[id]
  },
  ADD_MESSAGE(state, data) {
    const index = state.conversations.findIndex(el => el.id === data.id)
    state.conversations[index].content.push(new ChatMessage(data))
  }
}

const actions = http => ({})

const getters = {
  isOpen: state => id => state.openConversations[id] || false
}

export default {
  state,
  mutations,
  actions: actions(http),
  getters,
  namespaced: true
}
