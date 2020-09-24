<template>
  <div class="conversation col">
    <div class="conversation__toolbar row">
      <p>
        {{ conversation.id }}
      </p>
      <div class="row">
        <button @click="openConversationSettings">+</button>
        <button class="closeButton" @click="closeConversation(conversation.id)">
          X
        </button>
      </div>
    </div>
    <div class="conversation__content col" v-chat-scroll>
      <div
        v-for="(msg, index) in conversation.content"
        :class="[
          'message',
          { message__own: msg.participantId === conversation.user }
        ]"
        :key="index"
      >
        <h4>{{ conversation.userList[msg.participantId] }}</h4>
        <p>{{ msg.content }}</p>
      </div>
    </div>
    <form class="row" @submit.prevent="sendMessage">
      <input type="text" v-model="message" required />
      <button type="submit">SEND</button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['conversation'],
  data() {
    return {
      message: ''
    }
  },
  computed: {
    ...mapState({
      stompClient: state => state.user.stompClient
    })
  },
  methods: {
    closeConversation(id) {
      this.$store.commit('chats/CLOSE_CONVERSATION', id)
    },
    sendMessage() {
      if (this.message.trim().length) {
        const url = `/app/conversation/${this.conversation.id}/sendmessage`

        this.$store.state.chats.stompClient.send(
          url,
          {},
          JSON.stringify({
            participantId: this.conversation.user,
            content: this.message,
            type: 'CHAT'
          })
        )
      }
      this.message = ''
    },
    openConversationSettings() {
      this.openModal('conversationSettings', this.conversation)
    }
  }
}
</script>

<style lang="scss" scoped>
.conversation {
  width: 100%;
  height: 100%;
  max-height: 280px;
  justify-content: space-between;

  &__toolbar {
    justify-content: space-between;
  }

  &__content {
    height: 100%;
    width: 100%;
    background: #b3b3b3;
    overflow: auto;
  }
}
.message {
  background: #d6d6d6;
  width: 70%;
  align-self: flex-start;
  margin-bottom: 5px;
  text-align: left;

  &__own {
    align-self: flex-end;
    text-align: right;
    background: green;
  }
}
.closeButton {
  padding: 0 10px;
}
</style>
