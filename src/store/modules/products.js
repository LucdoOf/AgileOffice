import { App } from '../../core'

const state = {
  products: []
}

const getters = {
  getProducts: (state) => state.products,
  getProduct (state) {
    return (id) => {
      return state.products.find(product => parseInt(product.id) === parseInt(id))
    }
  }
}

const actions = {
  fetchProducts ({ commit }) {
    return App.request('/products').then(response => {
      if (App.treatResponse(response)) {
        commit('setProducts', response.data)
      }
    })
  },
  setProducts ({ commit }, products) {
    commit('setProducts', products)
  }
}

const mutations = {
  setProducts: (state, commands) => (state.products = commands)
}

export default {
  state,
  getters,
  actions,
  mutations
}
