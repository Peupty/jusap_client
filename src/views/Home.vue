<template>
  <div class="home col">
    <div class="toolbar row">
      <button @click="addGroup">Add group</button>
      <button @click="!editable ? (editable = true) : saveLayout()">
        {{ editable ? 'save' : 'edit layout' }}
      </button>
      <button @click="createLayout">Create Layout</button>
    </div>
    <section>
      <button
        v-for="(item, index) in layouts"
        @click="selectLayout(index)"
        :key="index"
        :disabled="item === layout"
        :class="{ 'button--green': item === layout }"
      >
        {{ item.name }}
      </button>
    </section>
    <main v-if="layout && layout.groups.length">
      <grid-layout
        :layout="layout.groups"
        :col-num="24"
        :row-height="32"
        :is-draggable="editable"
        :is-resizable="editable"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
      >
        <grid-item
          class="groupTile"
          v-for="item in layout.groups"
          :key="item.i"
          :i="item.i"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          ><app-group :id="item.i"></app-group
        ></grid-item>
      </grid-layout>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  data: () => ({
    editable: false
  }),
  computed: {
    ...mapState({
      layout: state => state.settings.activeLayout,
      layouts: state => state.settings.layouts,
      userId: state => state.user.id
    })
  },
  created() {
    this.fetchGroups()
  },
  methods: {
    addGroup() {
      this.openModal('addGroup')
    },
    async saveLayout() {
      try {
        await this.$http.user.editLayout(this.layout)

        this.editable = false
      } catch (error) {
        console.log(error)
      }
    },
    async fetchGroups() {
      if (this.$store.state.user.loggedIn) {
        await this.$store.dispatch('user/fetchGroups')

        this.$store.commit('settings/SET_ACTIVE_LAYOUT')
      }
    },
    createLayout() {
      this.openModal('createLayout')
    },
    selectLayout(index) {
      this.$store.commit('settings/SET_ACTIVE_LAYOUT', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.vue-grid-layout {
  border: 1px solid black;
  max-height: 100vh;
  min-height: 100vh;
  width: 100%;
}
.vue-grid-item {
  overflow-y: auto;
  height: 100%;
}
.groupTile {
  // background: #7a7a7a;
  color: #000;
}
.home {
  height: 100vh;
}
.toolbar {
  justify-content: center;
}
.button {
  &--green {
    background: lightgreen;
    border-color: lightgreen;
  }
}
</style>
