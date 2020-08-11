<template>
  <form class="col" @submit.prevent="onSubmit">
    <section class="col">
      <label for="">name</label>
      <input type="text" name="" id="" v-model="group.name" />
      <label for="">category</label>
      <input type="text" name="" id="" v-model="group.category" />
      <label for="">description</label>
      <input type="textarea" name="" id="" v-model="group.description" />
    </section>
    <button type="submit">create</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      group: this.createNewGroup()
    }
  },
  methods: {
    createNewGroup() {
      return {
        name: '',
        category: '',
        description: '',
        private: false,
        form: false
      }
    },
    async onSubmit() {
      try {
        await this.$http.group.create(this.group)

        this.createNewGroup()
      } catch (e) {
        alert(e)
      }
    }
  }
}
</script>

<style></style>
