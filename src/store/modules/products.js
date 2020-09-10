import { App } from '../../core'

const state = {
  products: [],
  categories: [],
  actualProduct: null,
  actualProductCommands: []
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
  },
  getCategoryLinkedProducts (state) {
    return (categoryId) => {
      return state.products.filter(product => {
        if (product.category) {
          return product.category.root.id === categoryId || product.category.id === categoryId
        }
        return false
      })
    }
  },
  getActualProduct: (state) => state.actualProduct,
  getActualProductCommands: (state) => state.actualProductCommands
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
  },
  fetchProduct ({ commit }, { id }) {
    return App.request('/products/' + id).then(response => {
      if (App.treatResponse(response)) {
        commit('setActualProduct', response.data)
      }
    })
  },
  fetchProductCommands ({ commit }, { id }) {
    return App.request('/stats/products/' + id + '/commands').then(response => {
      if (App.treatResponse(response)) {
        commit('setActualProductCommands', response.data)
      }
    })
  }
}

const mutations = {
  setProducts: (state, commands) => (state.products = commands),
  setCategories: (state, categories) => (state.categories = categories),
  setActualProduct: (state, product) => (state.actualProduct = product),
  setActualProductCommands: (state, commands) => (state.actualProductCommands = commands)
}

export default {
  state,
  getters,
  actions,
  mutations
}
