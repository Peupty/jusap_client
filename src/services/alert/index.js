import http from '@/services/http/index'
import store from '@/store/index'

const display = (http, store) => async alert => {
  if (alert.status === 403) {
    store.dispatch('alert/display', {
      type: 'error',
      text: 'you are not authenticated. log in'
    })
    location.reload()
  } else {
    return store.dispatch('alert/display', alert)
  }
}

export default {
  display: display(http, store)
}
