<template>
  <div id="app">
    <div id="nav">
      <div class="row">
        <router-link
          v-for="(route, index) in routes"
          :key="index"
          :to="route.path"
        >
          {{ route.name }}
        </router-link>
      </div>
      <b-button @click="logOut" v-if="loggedIn">Log out</b-button>
    </div>
    <router-view />
    <b-modal id="modal" scrollable>
      <template v-slot:modal-title>{{
        modalTitle.split('-').join(' ')
      }}</template>
      <template v-slot:modal-footer><div></div></template>
      <component :is="modal" :modalProps="modalProps"></component>
    </b-modal>
    <div class="alerts">
      <div
        v-for="(alert, index) in alerts"
        :key="index"
        :class="['alerts__item', `alerts__item--${alert.type}`]"
      >
        {{ alert.text }}
      </div>
    </div>
  </div>
</template>

<script>
import { protectedRoutes } from '@/router/index'
import { mapState } from 'vuex'

export default {
  data: () => ({
    modal: null,
    modalProps: {},
    modalTitle: ''
  }),
  computed: {
    ...mapState({
      alerts: state => state.alert.alerts
    }),
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
      component().then(a => (this.modalTitle = a.default.name))
      this.modalProps = props
      this.modal = component
      this.$bvModal.show('modal')
    },
    closeModal() {
      this.$bvModal.hide('modal')
      this.modal = null
    },
    async logOut() {
      try {
        await this.$http.user.logOut()

        await this.$alert.display({
          type: 'success',
          text: 'logged out successfuly'
        })
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
  display: flex;
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
// .col {
//   display: flex;
//   flex-direction: column;
// }
// .row {
//   display: flex;
//   flex-direction: row;
// }
// button {
//   margin: 0 2px;
//   padding: 0 10px;
// }
.modalx {
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
.alerts {
  position: fixed;
  display: flex;
  bottom: 0;
  right: 0;
  margin: 0 20px 20px 0;
  width: 280px;

  &__item {
    min-height: 120px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &--error {
      background: crimson;
    }
    &--success {
      background: lightgreen;
    }
    &--info {
      background: skyblue;
    }
  }
}
</style>
