<template>
  <form class="findGroup col" v-if="step === 0">
    <section class="col">
      <label for="">explore groups:</label>
      <input type="text" v-model="search" @input="fetchGroups" v-autofocus />
    </section>
    <ul class="groups col">
      <li v-for="(item, index) in results" :key="index" class="groups__item">
        <p>
          <strong>
            {{ item.name }}
          </strong>
          | {{ item.category }} | {{ item.participantCount }}
        </p>
        <button :disabled="item.member" @click.prevent="joinGroup(item)">
          join
        </button>
      </li>
    </ul>
  </form>
  <form class="col" v-else @submit.prevent="submitForm">
    <div class="col" v-for="(item, key) in form" :key="key">
      <label>{{ key }}</label>
      <input type="text" v-model="form[key]" />
    </div>
    <button type="submit">join</button>
  </form>
</template>

<script>
import { debounce } from 'lodash'

export default {
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
