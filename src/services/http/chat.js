const getExistingConversations = http => () =>
  http({
    method: 'get',
    url: '/api/message/conversations'
  })

const getConversationMessages = http => id =>
  http({
    method: 'get',
    url: `/api/message/${id}`
  })

const addParticipant = http => data =>
  http({
    method: 'post',
    url: '/api/message/add',
    data
  })

export default http => ({
  getExistingConversations: getExistingConversations(http),
  getConversationMessages: getConversationMessages(http),
  addParticipant: addParticipant(http)
})
