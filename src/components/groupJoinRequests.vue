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
      <b-list-group class="col requestList">
        <b-list-group-item
          v-for="(request, index) in requests"
          :key="index"
          class="col requestList__item"
        >
          <h4>nickname: {{ request.nickname }}</h4>
          <b-list-group
            tag="ul"
            v-for="(answer, question) in requestForm(request)"
            :key="question"
          >
            <b-list-group-item class="col">
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
          <b-button
            variant="success"
            class="mt-2"
            @click.prevent="acceptUser(request.nickname)"
            :disabled="users.includes(request.nickname)"
          >
            Accept
          </b-button>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    requests: Array
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
    acceptUser(nickname) {
      this.users.push(nickname)
      this.$emit('user-accept', this.users)
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
