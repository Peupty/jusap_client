<template>
  <form class="groupSettings col" @submit.prevent="save">
    <h3>{{ data.name }}</h3>
    <GroupJoinRequests
      @remove-user="onRemoveUser"
      :requests="requests"
      :id="data.id"
    ></GroupJoinRequests>
    <b-button type="submit" variant="primary" class="save">Save</b-button>
  </form>
</template>

<script>
import GroupJoinRequests from '@/components/groupJoinRequests.vue'
import createNewGroup from '@/utils/createNewGroup'

export default {
  name: 'Group-Settings',
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
        this.$alert.display(error)
      }
    },
    onRemoveUser(user) {
      this.requests.splice(user)
    }
  }
}
</script>

<style lang="scss" scoped>
.save {
  margin-top: 20px;
}
</style>
