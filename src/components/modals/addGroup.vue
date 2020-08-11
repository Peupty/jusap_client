<template>
  <div class="row">
    <button @click="createGroup">create group</button>
    <button @click="findGroup">find group</button>
  </div>
</template>

<script>
import createGroup from '@/components/modals/createGroup.vue'
import findGroup from '@/components/modals/findGroup.vue'

export default {
  methods: {
    createGroup() {
      this.$eventBus.$emit('open-modal', createGroup)
    },
    findGroup() {
      this.$eventBus.$emit('open-modal', findGroup)
    }
  }
}
</script>

<style lang="scss" scoped></style>
