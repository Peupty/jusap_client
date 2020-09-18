<template>
  <div id="app">
    <div id="nav" class="row">
      <div class="row">
        <router-link
          v-for="(route, index) in routes"
          :key="index"
          :to="route.path"
        >
          {{ route.name }}
        </router-link>
      </div>
      <button @click="logOut" v-if="loggedIn">log out</button>
    </div>
    <router-view />
    <div class="modal col" v-if="modalOpen">
      <button @click="closeModal" class="modal__close">X</button>
      <component
        :is="modal"
        :modalProps="modalProps"
        class="modal__window"
      ></component>
    </div>
  </div>
</template>

<script>
import { protectedRoutes } from '@/router/index'

export default {
  data: () => ({
    modal: null,
    modalOpen: false,
    modalProps: {}
  }),
  computed: {
    routes() {
      return this.loggedIn ? protectedRoutes : []
    },
    loggedIn() {
      return this.$store.getters['user/loggedIn']
    }
  },
  mounted() {
    this.$eventBus.$on('open-modal', this.openModalWindow)
    this.$eventBus.$on('close-modal', this.closeModal)
  },
  beforeDestroy() {
    this.$eventBus.$off('open-modal', this.openModalWindow)
    this.$eventBus.$off('close-modal', this.closeModal)
  },
  methods: {
    openModalWindow({ component, props }) {
      this.modalProps = props
      this.modal = component
      this.modalOpen = true
    },
    closeModal() {
      this.modal = null
      this.modalOpen = false
    },
    async logOut() {
      try {
        await this.$http.user.logOut()

        location.reload()
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}

#nav {
  padding: 30px;
  justify-content: space-between;

  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 0 5px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.col {
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  flex-direction: row;
}
button {
  margin: 0 2px;
  padding: 0 10px;
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #52525254;

  &__window {
    padding: 50px;
    border: 1px solid #000;
    background: #fff;
    max-width: 75%;
  }

  &__close {
    margin-left: auto;
    position: absolute;
    padding: 10px;
    background: #fff;
    top: 20px;
    right: 20px;
  }

  input,
  button {
    border: 1px solid gray;
  }

  ul {
    list-style-type: none;
  }
}
</style>
