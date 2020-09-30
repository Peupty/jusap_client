export default class Conversation {
  constructor({
    id,
    participantId,
    participants,
    messages = [],
    groupId,
    name
  }) {
    this.id = id
    this.user = participantId
    this.userList = this._mapUsersToObject(participants)
    this.content = messages
    this.groupId = groupId
    this.name = name || this._mapName(participants)
  }

  _mapUsersToObject(users) {
    return users.reduce((acc, user) => {
      acc[user.id] = user.nickname
      return acc
    }, {})
  }

  _mapName(userList) {
    const str = userList.map(el => el.nickname).join(', ')

    return str.length > 20 ? str.slice(0, 20) + '...' : str
  }
}
