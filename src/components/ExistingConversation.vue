<template>
  <div class="group" @click="openConversation(data.id)">
    {{
      data.name || chatUserNames(this.data.participants.map(el => el.nickname))
    }}
  </div>
</template>

<script>
import chatUserNames from '@/utils/chatUserNames'

export default {
  props: {
    data: Object
  },
  data() {
    return {
      users: []
    }
  },
  methods: {
    chatUserNames,
    async openConversation(id) {
      const { data } = await this.$http.chat.getConversationMessages(id)
      data.name = this.data.name

      this.$store.commit('chats/CREATE_CONVERSATION', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.group {
  text-align: start;
  margin-left: 10px;

  cursor: pointer;

  &:hover {
    background: skyblue;
  }
}
</style>
