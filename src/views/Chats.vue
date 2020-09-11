<template>
  <main class="row">
    <!-- <button @click="openChatSearch">open chat</button> -->
    <chat-select></chat-select>
    <div class="chats">
      <app-conversation
        v-for="(item, key) in conversations"
        :key="key"
        :conversation="item"
      ></app-conversation>
    </div>
  </main>
</template>

<script>
import appConversation from '@/components/conversation.vue'
import chatSelect from '@/components/chatSelect.vue'
import { mapState } from 'vuex'

export default {
  components: {
    appConversation,
    chatSelect
  },
  computed: {
    ...mapState({
      conversations: state => state.chats.conversations
    })
  },
  methods: {
    openChatSearch() {
      this.openModal('chatSelect')
    }
  }
}
</script>

<style lang="scss" scoped>
.chats {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 280px;
  gap: 20px;
  justify-content: space-around;
}
</style>
