import { App } from '../../core'

const state = {
  products: [],
  categories: []
}

const getters = {
  getProducts: (state) => state.products,
  getProduct (state) {
    return (id) => {
      return state.products.find(product => parseInt(product.id) === parseInt(id))
    }
  },
  getCategories: (state) => state.categories,
  getCategory (state) {
    return (id) => {
      return state.categories.find(category => parseInt(category.id) === parseInt(id))
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
  fetchCategories ({ commit }) {
    return App.request('/categories').then(response => {
      if (App.treatResponse(response)) {
        commit('setCategories', response.data)
      }
    })
  },
  setProducts ({ commit }, products) {
    commit('setProducts', products)
  },
  setCategories ({ commit }, categories) {
    commit('setCategories', categories)
  }
}

const mutations = {
  setProducts: (state, commands) => (state.products = commands),
  setCategories: (state, categories) => (state.categories = categories)
}

export default {
  state,
  getters,
  actions,
  mutations
}
