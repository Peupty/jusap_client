import axios from 'axios'
import user from './user'
import group from './group'
import chat from './chat'

export const httpService = http => ({
  user: user(http),
  group: group(http),
  chat: chat(http)
})

export default httpService(axios)
