<template>
  <form>
    <h5>Manage users</h5>
    <b-list-group>
      <b-list-group-item
        class="d-flex align-items-center"
        :button="true"
        v-for="(user) in users"
        :variant="
          modalProps.userList.hasOwnProperty(user.id) ? 'success' : ''
        "
        :key="user.id"
        @click.prevent="
          modalProps.userList.hasOwnProperty(user.id)
            ? removeParticipant(user.id)
            : addParticipant(user.id)
        "
      >
        <b-avatar class="mr-2"></b-avatar>
        <p class="my-auto">
          {{ user.nickname }}
        </p>
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
      users: [],
      addUser: true
    }
  },
  computed: {},
  created() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        const { data } = await this.$http.group.getParticipants(
          this.modalProps.groupId
        )
        this.users = data
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

        // delete this.availableUsers[id]
        // this.availableUsers = JSON.parse(JSON.stringify(this.availableUsers))
      } catch (error) {
        this.$alert.display(error)
      }
    },
    async removeParticipant(id) {
      try {
        const data = {
          participantId: parseInt(id),
          conversationId: this.modalProps.id
        }
        await this.$http.chat.removeParticipant(data)
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
