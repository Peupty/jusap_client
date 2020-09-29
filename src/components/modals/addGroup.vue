<template>
  <div class="mx-auto">
    <b-button @click="createGroup" >Create</b-button>
    <b-button @click="findGroup" class="mx-2">Find</b-button>
  </div>
</template>

<script>
export default {
  name: 'Add-Group',
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
