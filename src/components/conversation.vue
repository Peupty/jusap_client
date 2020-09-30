<template>
  <div class="conversation">
    <div class="conversation__toolbar">
      <p>
        {{ conversation.name }}
      </p>
      <b-button-group class="mb-2">
        <b-button @click="openConversationSettings" variant="success"
          ><b-icon-plus></b-icon-plus
        ></b-button>
        <b-button
          variant="danger"
          class="closeButton"
          @click="closeConversation(conversation.id)"
        >
          <b-icon-x></b-icon-x>
        </b-button>
      </b-button-group>
    </div>
    <div class="conversation__content" v-chat-scroll>
      <b-alert
        v-for="(msg, index) in conversation.content"
        :variant="msg.participantId === conversation.user ? 'success' : 'info'"
        show
        :class="[
          'message',
          { message__own: msg.participantId === conversation.user }
        ]"
        :key="index"
      >
        <h5>{{ conversation.userList[msg.participantId] }}</h5>
        <p>{{ msg.content }}</p>
      </b-alert>
    </div>
    <form class="" @submit.prevent="sendMessage">
      <b-input-group class="mt-2">
        <b-input type="text" v-model="message" required />
        <b-input-group-append>
          <b-button type="submit" variant="primary">SEND</b-button>
        </b-input-group-append>
      </b-input-group>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import chatUserNames from '@/utils/chatUserNames'

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
    chatUserNames,
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
  display: flex;
  width: 100%;
  height: 100%;
  max-height: 320px;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;

  &__toolbar {
    display: flex;
    justify-content: space-between;
  }

  &__content {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background: #b3b3b3;
    overflow: auto;
  }
}
.message {
  // background: #d6d6d6;
  display: flex;
  flex-direction: column;
  width: 70%;
  align-self: flex-start;
  margin-bottom: 5px;
  text-align: left;

  &__own {
    align-self: flex-end;
    text-align: right;
    // background: green;
  }
}
.closeButton {
  padding: 0 10px;
}
</style>
