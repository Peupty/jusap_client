import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs/esm6/compatibility/stomp'
import store from '@/store/index'

const connect = id => {
  const socket = new SockJS('http://localhost:8080/websocketApp')
  const stompClient = Stomp.over(socket)

  stompClient.connect({}, () => connectionSuccess(stompClient, id))

  return stompClient
}

const connectionSuccess = (stompClient, id) => {
  stompClient.subscribe(`/topic/${id}`, handleMessage)
}

const handleMessage = payload => {
  const data = JSON.parse(payload.body)
  const { type } = data

  switch (type) {
    case 'NEW':
      store.commit('chats/CREATE_CONVERSATION', data)
      break
    case 'CHAT':
      store.commit('chats/ADD_MESSAGE', data)
      break
    case 'GROUP':
      store.dispatch('user/refreshGroup', data.id)
      break
    default:
      break
  }
}

export default {
  connect
}
