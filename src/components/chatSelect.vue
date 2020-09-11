<template>
  <div class="chatSelect">
    <h3 class="title">
      open conversation
    </h3>
    <chat-users
      v-for="chat in groups"
      :key="chat.group.id"
      :chat="chat.group"
      :participantId="chat.participantId"
    ></chat-users>
  </div>
</template>

<script>
import chatUsers from '@/components/chatUsers.vue'
import { mapState } from 'vuex'

export default {
  components: {
    chatUsers
  },
  computed: {
    ...mapState({
      groups: state => state.user.groups
    })
  }
}
</script>

<style lang="scss" scoped>
.chatSelect {
  width: 300px;
  margin-right: 20px;
}
.title {
  border-bottom: 1px solid #000;
  margin-bottom: 10px;
}
</style>
