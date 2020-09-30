<template>
  <form>
    <h5>Add user</h5>
    <b-list-group class="col">
      <b-list-group-item
        :button="true"
        v-for="(user, id) in users"
        :key="id"
        @click.prevent="addParticipant(id)"
      >
        {{ user + id }}
      </b-list-group-item>
    </b-list-group>
  </form>
</template>

<script>
export default {
  name: 'Conversation-Settings',
  props: {
    modalProps: Object
  },
  data() {
    return {
      users: {}
    }
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        const { data } = await this.$http.group.getParticipants(
          this.modalProps.groupId
        )
        this.users = data.reduce((acc, user) => {
          // eslint-disable-next-line
          if (!this.modalProps.userList.hasOwnProperty(user.id))
            acc[user.id] = user.nickname
          return acc
        }, {})
      } catch (error) {
        this.$alert.display(error)
      }
    },
    async addParticipant(id) {
      try {
        const data = {
          participantId: parseInt(id),
          conversationId: this.modalProps.id
        }
        await this.$http.chat.addParticipant(data)

        delete this.users[id]
        this.users = JSON.parse(JSON.stringify(this.users))
      } catch (error) {
        this.$alert.display(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  li:hover {
    cursor: pointer;
    background: skyblue;
  }
}
</style>
