<template>
  <main class="row">
    <!-- <button @click="openChatSearch">open chat</button> -->
    <div class="sidebar col">
      <h3 class="title">
        new conversation
      </h3>
      <ChatUsers
        v-for="chat in groups"
        :key="chat.group.id"
        :chat="chat.group"
        :participantId="chat.participantId"
      ></ChatUsers>
    </div>
    <div class="chats">
      <app-conversation
        v-for="(item, key) in conversations"
        :key="key"
        :conversation="item"
      ></app-conversation>
    </div>
    <div class="sidebar col">
      <h3 class="title">existing conversations</h3>
      <ExistingConversation
        v-for="conversation in existingConversations"
        :key="conversation.id"
        :data="conversation"
      ></ExistingConversation>
    </div>
  </main>
</template>

<script>
import ChatUsers from '@/components/chatUsers.vue'
import appConversation from '@/components/conversation.vue'
import ExistingConversation from '@/components/ExistingConversation.vue'
import { mapState } from 'vuex'

export default {
  components: {
    appConversation,
    ChatUsers,
    ExistingConversation
  },
  computed: {
    ...mapState({
      groups: state => state.user.groups,
      conversations: state => state.chats.conversations,
      existingConversations: state => state.chats.existingConversations
    })
  },
  async created() {
    await this.getExistingConversations()
  },
  methods: {
    openChatSearch() {
      this.openModal('chatSelect')
    },
    getExistingConversations() {
      this.$store.dispatch('chats/getExistingConversations')
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  margin: 0 10px;
}
.sidebar {
  width: 15%;
}
.chats {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 280px;
  gap: 20px;
  justify-content: space-around;
  margin: 0 10px;
}
.title {
  border-bottom: 1px solid #000;
  margin-bottom: 10px;
}
</style>
