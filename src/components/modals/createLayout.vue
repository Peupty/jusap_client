<template>
  <form class="col" @submit.prevent="createLayout">
    <label for="">name</label>
    <input type="text" name="" v-model="layout.name" required />
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
      const index = this.layout.groups.findIndex(el => el.name === group.name)

      if (index < 0) {
        this.layout.groups.push(group)
      } else {
        this.layout.groups.splice(index, 1)
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
