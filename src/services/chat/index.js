import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs/esm6/compatibility/stomp'

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
  console.log(payload)
}

export default {
  connect
}
