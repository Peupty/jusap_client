<template>
  <section class="col">
    <h4>User settings</h4>
    <div class="d-flex">
      <b-list-group class="list">
        <h5>Layouts:</h5>
        <li class="row" v-for="layout in layouts" :key="layout.name">
          <p>{{ layout.name }}</p>
          <b-button class="d-flex" @click.prevent="deleteLayout(layout.name)">
            <b-icon-x class="m-auto"></b-icon-x>
          </b-button>
        </li>
      </b-list-group>
      <b-list-group class="list">
        <h5>Groups:</h5>
        <li
          class="d-flex align-items-center"
          v-for="group in groups"
          :key="group.group.id"
        >
          <div class="d-flex align-items-center">
            <b-avatar size="20" class="mr-2"></b-avatar>
            <p class="my-auto">{{ group.group.name }}</p>
          </div>
          <b-button
            title="leave group"
            class="d-flex"
            @click="leaveGroup(group.group.id)"
          >
            <b-icon-x class="m-auto"></b-icon-x>
          </b-button>
        </li>
      </b-list-group>
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
.list {
  width: 300px;
  margin-left: 15px;
}
p {
  margin: 0;
}
</style>
