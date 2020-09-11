export default class Conversation {
  constructor({ id, participantId }) {
    this.id = id
    this.user = participantId
    this.content = []
  }
}
