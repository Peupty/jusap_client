<template>
  <form class="col" @submit.prevent="createLayout">
    <label for="">name</label>
    <input type="text" name="" v-model="layout.name" />
    <ul>
      <li
        v-for="(item, index) in groups"
        :key="index"
        @click="toggleGroup(item.group)"
        :class="[{ green: layout.groups.includes(item.group) }]"
      >
        {{ item.group.name }}
      </li>
    </ul>
    <button type="submit">create layout</button>
  </form>
</template>

<script>
import { mapState } from 'vuex'
import layoutFactory from '@/factories/layout'

export default {
  data: () => ({
    layout: {
      name: '',
      groups: []
    }
  }),
  computed: {
    ...mapState({
      groups: state => state.user.groups
    })
  },
  methods: {
    toggleGroup(group) {
      if (!this.layout.groups.includes(group)) {
        this.layout.groups.push(group)
      }
    },
    async createLayout() {
      try {
        const layout = layoutFactory.create(this.layout)
        await this.$store.dispatch('settings/createLayout', layout)

        this.$eventBus.$emit('close-modal')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.green {
  background: green;
}
</style>
