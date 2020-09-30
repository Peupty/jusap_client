<template>
  <div class="group">
    <b-button block @click="toggle" variant="info" class="mt-2">{{ chat.name }}</b-button>
    <b-list-group class="users mt-2" v-if="open && otherUsers.length">
      <b-list-group-item
        class="list-item"
        v-for="user in otherUsers"
        :key="user.id"
        @click="openConversation(user.id)"
      >
        {{ user.nickname }}
      </b-list-group-item>
    </b-list-group>
    <div v-if="open && !otherUsers.length">
      <p>No users in group</p>
    </div>
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
    async toggle() {
      if (this.open) {
        this.open = false
      } else {
        await this.fetchUsers()
        this.open = true
      }
    },
    async fetchUsers() {
      try {
        const { data } = await this.$http.group.getParticipants(this.chat.id)

        this.users = data
        this.open = true
      } catch (error) {
        this.$alert.display(error)
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
      background: skyblue;
    }
  }
}
.users {
  margin-left: 10px;
  list-style-type: none;

  .list-item:hover {
    cursor: pointer;
    background: skyblue;
  }
}
</style>
