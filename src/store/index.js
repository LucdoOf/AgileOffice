import Vue from 'vue'
import Vuex from 'vuex'
import headerRoutes from './modules/headerRoutes'
import commands from './modules/commands'
import products from './modules/products'
import baskets from './modules/baskets'
import basketEntries from './modules/basketEntries'
import users from './modules/users'
import pages from './modules/pages'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    headerRoutes,
    commands,
    products,
    baskets,
    basketEntries,
    users,
    pages
  }
})

store.allGetters = Reflect.ownKeys(store.getters)
store.allActions = Reflect.ownKeys(store._actions)

export default store
