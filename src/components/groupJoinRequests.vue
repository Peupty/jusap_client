<template>
  <div class="col">
    <div class="row">
      <h4>Join requests: {{ requests.length }}</h4>
      <button @click.prevent="open = !open">
        {{ open ? 'hide' : 'open' }}
      </button>
    </div>
    <div v-if="open && !requests.length">
      No join requests
    </div>
    <div class="col" v-if="open && requests.length">
      <ul class="col requestList">
        <li
          v-for="(request, index) in requests"
          :key="index"
          class="col requestList__item"
        >
          <h4>nickname: {{ request.nickname }}</h4>
          <ul
            class="col"
            v-for="(answer, question) in requestForm(request)"
            :key="question"
          >
            <li class="col">
              <p>
                <strong>
                  {{ question }}
                </strong>
              </p>
              <p>
                {{ answer }}
              </p>
            </li>
          </ul>
          <button
            @click.prevent="acceptUser(request.nickname)"
            :disabled="users.includes(request.nickname)"
          >
            accept
          </button>
        </li>
      </ul>
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
