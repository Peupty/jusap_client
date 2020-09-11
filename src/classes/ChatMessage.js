export default class ChatMessage {
  constructor({ participantId, content }) {
    this.author = participantId
    this.content = content
  }
}
