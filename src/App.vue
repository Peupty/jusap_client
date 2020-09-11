<template>
  <div id="app">
    <div id="nav">
      <router-link
        v-for="(route, index) in routes"
        :key="index"
        :to="route.path"
      >
        {{ route.name }}
      </router-link>
    </div>
    <router-view />
    <div class="modal col" v-if="modalOpen">
      <h3 @click="closeModal" class="modal__close">X</h3>
      <component
        :is="modal"
        :modalProps="modalProps"
        class="modal__window"
      ></component>
    </div>
  </div>
</template>

<script>
import { routes, protectedRoutes } from '@/router/index'

export default {
  data: () => ({
    modal: null,
    modalOpen: false,
    modalProps: {}
  }),
  computed: {
    routes() {
      return this.$store.getters['user/loggedIn'] ? protectedRoutes : routes
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

  a {
    font-weight: bold;
    color: #2c3e50;

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
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    background: #fff;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 20px;
    right: 20px;
    align-items: center;
    justify-content: center;
    display: flex;
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
