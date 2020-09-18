export default class Conversation {
  constructor({ id, participantId, participants, messages = [], groupId }) {
    this.id = id
    this.user = participantId
    this.userList = participants
    this.content = messages
    this.groupId = groupId
  }
}
