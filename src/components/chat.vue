<template>
  <div>
    <h2 @click="fetchUsers">{{ chat.name }}</h2>

    <ul class="users col" v-if="open && users.length">
      <li
        v-for="user in users"
        :key="user.id"
        @click="openConversation(user.id)"
      >
        <h4>{{ user.nickname }}</h4>
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
      this.$store.state.user.stompClient.send(
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

<style></style>
