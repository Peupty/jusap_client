import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/components/global'
import http from '@/services/http/index'
import '@/mixins/global'
import '@/directives/global'
import VueChatScroll from 'vue-chat-scroll'
import alert from '@/services/alert/index'

Vue.use(VueChatScroll)

Vue.config.productionTip = false

Vue.prototype.$eventBus = new Vue()
Vue.prototype.$http = http
Vue.prototype.$alert = alert

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
