export default class Conversation {
  constructor({ id, participantId, participants, messages = [], groupId }) {
    this.id = id
    this.user = participantId
    this.userList = this._mapUsersToObject(participants)
    this.content = messages
    this.groupId = groupId
  }

  _mapUsersToObject(users) {
    return users.reduce((acc, user) => {
      acc[user.id] = user.nickname
      return acc
    }, {})
  }
}
