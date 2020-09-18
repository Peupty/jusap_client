<template>
  <form class="col">
    <h2>user settings</h2>
    <ul class="col">
      <h4>layouts:</h4>
      <li class="row" v-for="layout in layouts" :key="layout.name">
        <p>{{ layout.name }}</p>
        <button @click.prevent="deleteLayout(layout.name)">X</button>
      </li>
    </ul>
  </form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      layouts: state => state.settings.layouts
    })
  },
  methods: {
    deleteLayout(name) {
      this.$store.dispatch('settings/deleteLayout', name)
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  text-align: start;
  align-items: start;
  margin: 0 10px;
}
button {
  padding: 0 10px;
  margin-left: 10px;
}
li {
  width: 100%;
  margin-top: 5px;
  justify-content: space-between;
}
</style>
