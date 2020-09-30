<template>
  <form class="findGroup col" v-if="step === 0">
    <div class="col">
      <label for="find-group">Find Group:</label>
      <b-input
        type="text"
        name="find-group"
        v-model="search"
        @input="fetchGroups"
        v-autofocus
      />
    </div>
    <ul class="groups mt-4">
      <li
        v-for="(item, index) in results"
        :key="index"
        class="groups__item mt-2"
      >
        <p>
          <strong>
            {{ item.name }}
          </strong>
          | {{ item.category }} |
          <b-badge>
            Members: {{ item.participantCount }}
          </b-badge>
        </p>
        <b-button
          :variant="item.member ? 'secondary' : 'primary'"
          :disabled="item.member"
          @click.prevent="joinGroup(item)"
        >
          Join
        </b-button>
      </li>
    </ul>
  </form>
  <form class="col" v-else @submit.prevent="submitForm">
    <b-form-group v-for="(item, key) in form" :key="key">
      <label>{{ key }}</label>
      <b-input type="text" v-model="form[key]" required />
    </b-form-group>
    <b-button type="submit" variant="primary">Join</b-button>
  </form>
</template>

<script>
import { debounce } from 'lodash'

export default {
  name: 'Find-Group',
  data: () => ({
    search: '',
    results: [],
    step: 0,
    form: {},
    inviteCode: ''
  }),
  methods: {
    fetchGroups: debounce(async function() {
      try {
        const { data } = await this.$http.group.findGroups(this.search)

        this.results = data.content
      } catch (error) {
        this.$alert.display(error)
      }
    }, 1000),
    async joinGroup(group) {
      try {
        const { data } = await this.$http.group.join(group)

        Object.assign(this.form, data.form)

        this.inviteCode = group.inviteCode
        this.step++
      } catch (error) {
        this.$alert.display(error)
      }
    },
    async submitForm() {
      try {
        await this.$http.group.submitJoinForm({
          form: this.form,
          inviteCode: this.inviteCode
        })

        this.$eventBus.$emit('close-modal')
      } catch (error) {
        this.$alert.display(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.groups {
  text-align: start;

  &__item {
    display: flex;
    justify-content: space-between;
  }
}
</style>
