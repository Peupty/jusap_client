<template>
  <form class="col" @submit.prevent="createLayout">
    <b-form-group>
      <label for="">Name:</label>
      <b-input type="text" name="" v-model="layout.name" required />
    </b-form-group>
    <b-list-group tag="ul">
      <b-list-group-item
        tag="li"
        v-for="(item, index) in groups"
        :key="index"
        @click="toggleGroup(item.group)"
        :class="[{ 'bg-success': layout.groups.includes(item.group) }]"
      >
        {{ item.group.name }}
      </b-list-group-item>
    </b-list-group>
    <b-button type="submit" variant="primary" class="mt-3">Create</b-button>
  </form>
</template>

<script>
import { mapState } from 'vuex'
import layoutFactory from '@/factories/layout'

export default {
  name: 'Create-Layout',
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
        if (!this.layout.name.trim().length) return
        const layout = layoutFactory.create(this.layout)

        await this.$store.dispatch('settings/createLayout', layout)

        this.$eventBus.$emit('close-modal')
      } catch (error) {
        this.$alert.display(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  cursor: pointer !important;

  &:hover {
    background: lightgreen;
  }
}
</style>
