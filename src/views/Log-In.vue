<template>
  <form @submit.prevent="submitForm" name="sign in">
    <section>
      <label for="">Email:</label>
      <input type="email" name="" v-model="email" ref="email" v-autofocus />
    </section>
    <section>
      <label for="">Password:</label>
      <input type="password" name="" v-model="password" ref="password" />
    </section>
    <button type="submit" ref="submit">Sign In</button>
  </form>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    async submitForm() {
      try {
        await this.$store.dispatch('user/logIn', {
          email: this.email,
          password: this.password
        })

        this.$router.push({ name: 'Home' })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style></style>
