<template>
  <div class="home col">
    <div class="toolbar row">
      <button @click="openModal">Add group</button>
      <button @click="!editable ? (editable = true) : saveLayout()">
        {{ editable ? 'save' : 'edit layout' }}
      </button>
      <button @click="createLayout">Create Layout</button>
    </div>
    <grid-layout
      :layout="layout"
      :col-num="24"
      :row-height="30"
      :is-draggable="editable"
      :is-resizable="editable"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
      v-if="layout.length"
    >
      <grid-item
        class="groupTile"
        v-for="item in layout"
        :key="item.i"
        :i="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        ><app-group :id="item.i"></app-group
      ></grid-item>
    </grid-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import addGroupModal from '@/components/modals/addGroup.vue'
import createLayoutModal from '@/components/modals/createLayout.vue'

export default {
  name: 'Home',
  data: () => ({
    editable: false
  }),
  computed: {
    ...mapState({
      layout: state => state.settings.activeLayout,
      userId: state => state.user.id
    })
  },
  created() {
    this.fetchGroups()
  },
  methods: {
    openModal() {
      this.$eventBus.$emit('open-modal', addGroupModal)
    },
    saveLayout() {
      this.editable = false
    },
    fetchGroups() {
      if (this.$store.state.user.loggedIn) {
        this.$store.dispatch('user/fetchGroups')
      }
    },
    createLayout() {
      this.$eventBus.$emit('open-modal', createLayoutModal)
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
  background: #7a7a7a;
  color: #000;
}
.home {
  height: 100vh;
}
.toolbar {
  justify-content: center;
}
</style>
