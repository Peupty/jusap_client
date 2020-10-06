<template>
  <div class="group">
    <b-button
      block
      @click="toggle"
      variant="info"
      class="d-flex align-items-center mt-2"
    >
      <b-avatar size="20" class="mr-2"></b-avatar>
      <p class="my-auto">
        {{ truncate(chat.name, 15) }}
      </p>
    </b-button>
    <b-list-group class="users mt-2" v-if="open && otherUsers.length">
      <b-list-group-item
        class="list-item"
        v-for="user in otherUsers"
        :key="user.id"
        @click="openConversation(user.id)"
      >
        <div class="d-flex flex-row align-items-center">
          <b-avatar class="mr-2" size="30"></b-avatar>
          <p class="my-auto">
            {{ user.nickname }}
          </p>
        </div>
      </b-list-group-item>
    </b-list-group>
    <div v-if="open && !otherUsers.length">
      <p>No users in group</p>
    </div>
  </div>
</template>

<script>
import truncate from '@/utils/truncate'

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
    truncate,
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
