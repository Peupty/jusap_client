<template>
  <div class="home col">
    <div class="toolbar">
      <b-button-group class="row">
        <b-button @click="addGroup" variant="primary">Add group</b-button>
        <b-button
          @click="!editable ? (editable = true) : saveLayout()"
          :variant="!editable ? 'primary' : 'warning'"
        >
          {{ editable ? 'Save' : 'Edit layout' }}
        </b-button>
        <b-button @click="createLayout" variant="primary"
          >Create layout</b-button
        >
      </b-button-group>
      <b-button-group class="mt-2">
        <b-button
          v-for="(item, index) in layouts"
          @click="selectLayout(index)"
          :key="index"
          :disabled="editable || item === layout"
          :variant="item === layout ? 'success' : 'secondary'"
        >
          {{ item.name }}
        </b-button>
      </b-button-group>
    </div>
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
        :use-css-transforms="!true"
        :class="{ bordered: editable }"
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
      // layout: state => state.settings.activeLayout,
      layouts: state => state.settings.layouts,
      userId: state => state.user.id
    }),
    layout() {
      return this.$store.getters['settings/getActiveLayout']
    }
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
        await this.$store.dispatch('settings/editLayout', this.layout)

        this.editable = false
      } catch (error) {
        this.$alert.display(error)
      }
    },
    async fetchGroups() {
      if (this.$store.state.user.loggedIn) {
        await this.$store.dispatch('user/fetchGroups')

        if (this.$store.state.settings.activeLayout === null) {
          this.$store.commit('settings/SET_ACTIVE_LAYOUT')
        }
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
  max-height: 100vh;
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    width: 150px;
  }
}
.button {
  &--green {
    background-color: lightgreen;
  }
}
.bordered {
  border: 1px dashed #000;
}
</style>
