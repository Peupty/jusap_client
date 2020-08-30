<template>
  <div class="row">
    <button @click="createGroup">create group</button>
    <button @click="findGroup">find group</button>
  </div>
</template>

<script>
export default {
  methods: {
    createGroup() {
      this.openModal('createGroup')
    },
    findGroup() {
      this.openModal('findGroup')
    }
  }
}
</script>

<style lang="scss" scoped></style>
