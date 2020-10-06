<template>
  <div class="col">
    <div class="row">
      <h5>Join requests: {{ requests.length }}</h5>
      <b-button @click.prevent="open = !open" class="ml-auto">
        {{ open ? 'Hide' : 'Open' }}
      </b-button>
    </div>
    <div v-if="open && !requests.length">
      No join requests
    </div>
    <div class="col" v-if="open && requests.length">
      <b-list-group class="requestList">
        <b-list-group-item
          v-for="(request, index) in requests"
          :key="index"
          class="requestList__item"
        >
          <h5>nickname: {{ request.nickname }}</h5>
          <div class="d-flex align-items-center mb-2">
            <h5 class="my-auto">avatar:</h5>
            <b-avatar class="ml-2"></b-avatar>
          </div>
          <b-list-group
            v-for="(answer, question) in requestForm(request)"
            :key="question"
          >
            <b-list-group-item class="">
              <p>
                <strong>
                  {{ question }}
                </strong>
              </p>
              <p>
                {{ answer }}
              </p>
            </b-list-group-item>
          </b-list-group>
          <b-button-group class="mt-2">
            <b-button
              variant="success"
              @click.prevent="accept(request)"
              :disabled="users.includes(request.nickname)"
            >
              Accept
            </b-button>
            <b-button variant="danger" @click.prevent="decline(request)"
              >Decline</b-button
            >
          </b-button-group>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    requests: Array,
    id: [Number, String]
  },
  data() {
    return {
      users: [],
      open: false
    }
  },
  methods: {
    requestForm(request) {
      return request.form.form
    },
    async accept(request) {
      try {
        await this.$http.group.acceptRequest(this.id, [request.nickname])

        this.$emit('remove-user', request)
      } catch (error) {
        this.$alert.display(error)
      }
    },
    async decline(request) {
      try {
        await this.$http.group.declineRequest(this.id, [request.nickname])

        this.$emit('remove-user', request)
      } catch (error) {
        this.$alert.display(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.requestList {
  margin-top: 10px;
  text-align: left;

  &__item {
    margin-top: 5px;
  }
}
</style>
