<template>
  <form action="" class="findGroup col">
    <section class="col">
      <label for="">search for groups</label>
      <input
        type="text"
        name=""
        id=""
        v-model="search"
        @input="fetchGroups"
        autofocus
      />
    </section>
    <ul class="groups">
      <li v-for="(item, index) in results" :key="index">
        {{ item }}
      </li>
    </ul>
  </form>
</template>

<script>
import { debounce } from 'lodash'

export default {
  data: () => ({
    search: '',
    results: []
  }),
  methods: {
    fetchGroups: debounce(async function() {
      try {
        const { data } = await this.$http.group.findGroups(this.search)

        this.results = data.content
      } catch (error) {
        console.log(error)
      }
    }, 1000)
  }
}
</script>

<style></style>
