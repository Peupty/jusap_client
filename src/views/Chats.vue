<template>
  <main class="">
    <!-- <button @click="openChatSearch">open chat</button> -->
    <div class="sidebar">
      <h4 class="title">
        New conversation
      </h4>
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
    <div class="sidebar">
      <h4 class="title">Existing conversations</h4>
      <b-list-group>
        <b-list-group-item>
          <ExistingConversation
            v-for="conversation in existingConversations"
            :key="conversation.id"
            :data="conversation"
          ></ExistingConversation>
        </b-list-group-item>
      </b-list-group>
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
  display: flex;
  margin: 0 10px;
}
.sidebar {
  display: flex;
  flex-direction: column;
  width: 15%;
}
.chats {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 320px;
  gap: 20px;
  justify-content: space-around;
  margin: 0 10px;
}
.title {
  border-bottom: 1px solid #000;
  margin-bottom: 10px;
}
</style>
