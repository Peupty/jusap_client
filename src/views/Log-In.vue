<template>
  <form @submit.prevent="submitForm" name="sign in" class="col mx-auto">
    <b-form-group>
      <label for="email">Email:</label>
      <b-input
        type="email"
        class="input-field"
        v-model="email"
        ref="email"
        name="email"
        v-autofocus
      />
    </b-form-group>
    <b-form-group >
      <label for="password">Password:</label>
      <b-input
        type="password"
        name="password"
        v-model="password"
        ref="password"
      />
    </b-form-group>
    <b-button type="submit" ref="submit" variant="primary">
      Sign In
    </b-button>
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
        this.$alert.display(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  max-width: 300px;
  justify-self: center;
  // align-items: center;
  // justify-content: center;
}
</style>
