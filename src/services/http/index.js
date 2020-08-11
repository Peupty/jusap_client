import axios from 'axios'
import user from './user'
import group from './group'

export const httpService = http => ({
  user: user(http),
  group: group(http)
})

export default httpService(axios)
