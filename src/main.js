import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/components/global'
import http from '@/services/http/index'
import '@/mixins/global'
import '@/directives/global'

Vue.config.productionTip = false

Vue.prototype.$eventBus = new Vue()
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
