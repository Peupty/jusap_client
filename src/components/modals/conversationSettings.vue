<template>
  <form>
    <h3>add user</h3>
    <ul class="col">
      <li
        v-for="(user, index) in users"
        :key="user.id"
        @click.prevent="addParticipant(user, index)"
      >
        {{ user.nickname }}
      </li>
    </ul>
  </form>
</template>

<script>
export default {
  props: {
    modalProps: Object
  },
  data() {
    return {
      users: []
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
        this.users = data.filter(
          user => !this.modalProps.userList.find(el => el.id === user.id)
        )
      } catch (error) {
        console.log(error)
      }
    },
    async addParticipant(id, index) {
      try {
        await this.$http.chat.addParticipant({
          participantId: id,
          conversationId: this.modalProps.id
        })

        this.users.splice(index, 1)
      } catch (error) {
        console.log(error)
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
