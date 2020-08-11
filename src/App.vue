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
    <component :is="modal" v-if="modalOpen" class="modal"></component>
  </div>
</template>

<script>
import { routes } from '@/router/index'

export default {
  data: () => ({
    routes,
    modal: null,
    modalOpen: false
  }),
  mounted() {
    this.$eventBus.$on('open-modal', this.openModal)
    this.$eventBus.$on('close-modal', this.closeModal)
  },
  beforeDestroy() {
    this.$eventBus.$off('open-modal', this.openModal)
    this.$eventBus.$off('close-modal', this.closeModal)
  },
  methods: {
    openModal(component) {
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #000;
  padding: 50px;
  background: #fff;
  display: flex;
  align-items: center;

  input,
  button {
    border: 1px solid gray;
  }

  ul {
    list-style-type: none;
  }
}
</style>
