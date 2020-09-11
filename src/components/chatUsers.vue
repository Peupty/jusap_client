<template>
  <div class="group">
    <h4 @click="fetchUsers" class="group__name">{{ chat.name }}</h4>
    <ul class="users col" v-if="open && users.length">
      <li
        v-for="user in otherUsers"
        :key="user.id"
        @click="openConversation(user.id)"
      >
        <p>{{ user.nickname }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    chat: {
      type: Object,
      required: true
    },
    participantId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      open: false,
      users: []
    }
  },
  computed: {
    otherUsers() {
      return this.users.filter(el => el.id !== this.participantId)
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const { data } = await this.$http.group.getParticipants(this.chat.id)

        this.users = data
        this.open = true
      } catch (error) {
        console.log(error)
      }
    },
    openConversation(id) {
      const url = `/app/conversation/new/${id}`
      this.$store.state.chats.stompClient.send(
        url,
        {},
        JSON.stringify({
          participantId: this.participantId,
          type: 'NEW'
        })
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.group {
  text-align: start;
  margin-left: 10px;

  &__name {
    cursor: pointer;

    &:hover {
      background: #8698c9;
    }
  }
}
.users {
  margin-left: 10px;
  list-style-type: none;

  li:hover {
    cursor: pointer;
    background: #8698c9;
  }
}
</style>
