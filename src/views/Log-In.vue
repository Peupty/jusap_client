<template>
  <form @submit.prevent="submitForm" name="sign in">
    <section>
      <label for="">Email:</label>
      <input type="email" name="" id="" v-model="email" ref="email" autofocus />
    </section>
    <section>
      <label for="">Password:</label>
      <input type="password" name="" id="" v-model="password" ref="password" />
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
    submitForm() {
      this.$store
        .dispatch('user/logIn', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: 'Home' })
        })
    }
  }
}
</script>

<style></style>
