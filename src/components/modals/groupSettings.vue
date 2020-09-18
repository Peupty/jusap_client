<template>
  <form class="groupSettings col" @submit.prevent="save">
    <h2>{{ data.name }} settings</h2>
    <GroupJoinRequests
      :requests="requests"
      @user-accept="onUserAccept"
    ></GroupJoinRequests>
    <button type="submit" class="save">save</button>
  </form>
</template>

<script>
import GroupJoinRequests from '@/components/groupJoinRequests.vue'
import createNewGroup from '@/utils/createNewGroup'

export default {
  components: {
    GroupJoinRequests
  },
  props: {
    modalProps: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      data: JSON.parse(JSON.stringify(this.modalProps)),
      group: this.createNewGroup(this.data),
      requests: [],
      users: []
    }
  },
  async created() {
    await this.fetchRequests()
  },
  methods: {
    createNewGroup,
    async fetchRequests() {
      try {
        const { data } = await this.$http.group.getJoinRequests(this.data.id)
        this.requests = data
      } catch (error) {}
    },
    async save() {
      try {
        await this.$http.group.acceptRequests(this.data.id, this.users)
        this.$eventBus.$emit('close-modal')
      } catch (error) {
        console.log(error)
      }
    },
    onUserAccept(users) {
      this.users = users
    }
  }
}
</script>

<style lang="scss" scoped>
.save {
  margin-top: 20px;
}
</style>
