import SockJS from 'sockjs'
import Stomp from '@stomp/stompjs'

function connect(event) {
  event.preventDefault()

  const socket = new SockJS('/websocketApp')
  const stompClient = Stomp.over(socket)
  stompClient.connect({}, connectionSuccess)
}

function connectionSuccess() {
  stormClient.subscribe('')
}