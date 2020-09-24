<template>
  <section class="col">
    <h2>user settings</h2>
    <div class="row">
      <ul class="col">
        <li>
          <h3>layouts:</h3>
        </li>
        <li class="row" v-for="layout in layouts" :key="layout.name">
          <p>{{ layout.name }}</p>
          <button @click.prevent="deleteLayout(layout.name)">X</button>
        </li>
      </ul>
      <ul class="col">
        <li>
          <h3>groups:</h3>
        </li>
        <li class="row" v-for="group in groups" :key="group.group.id">
          <p>{{ group.group.name }}</p>
          <button title="leave group" @click="leaveGroup(group.group.id)">
            X
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      layouts: state => state.settings.layouts,
      groups: state => state.user.groups
    })
  },
  methods: {
    deleteLayout(name) {
      this.$store.dispatch('settings/deleteLayout', name)
    },
    leaveGroup(id) {
      this.$store.dispatch('user/leaveGroup', id)
    }
  }
}
</script>

<style lang="scss" scoped>
section {
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
ul {
  list-style-type: none;
  margin-left: 10px;
}
</style>
