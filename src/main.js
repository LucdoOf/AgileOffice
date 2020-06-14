import Vue from 'vue'
import Application from './App.vue'
import router from './router'
import store from './store'
import Notifications from 'vue-notification'
import Multiselect from 'vue-multiselect'
import { App } from './core'
import VModal from 'vue-js-modal'
import { mapGetters } from 'vuex'

Vue.config.productionTip = false

Vue.use(VModal, { dynamic: true, dynamicDefaults: { clickToClose: true } })
Vue.use(Notifications)
Vue.component('multiselect', Multiselect)

Vue.prototype.$app = App

Vue.mixin({
  computed: {
    ...mapGetters(store.allGetters)
  }
})

new Vue({
  router,
  store,
  render: h => h(Application)
}).$mount('#app')
