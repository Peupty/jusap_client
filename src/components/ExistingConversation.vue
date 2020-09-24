<template>
  <div class="group" @click="openConversation(data.id)">
    {{ data.name || displayedNames }}
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {
      users: []
    }
  },
  computed: {
    displayedNames() {
      const str = this.data.participants.map(el => el.nickname).join(', ')

      return str.length > 20 ? str.slice(0, 20) + '...' : str
    }
  },
  methods: {
    async openConversation(id) {
      const { data } = await this.$http.chat.getConversationMessages(id)

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
