import { App } from '../../core'

const state = {
  basketEntries: []
}

const getters = {
  getBasketEntries: (state) => {
    return (basketId) => {
      return state.basketEntries.filter(basketEntry => parseInt(basketEntry.basket_id) === parseInt(basketId))
    }
  },
  getBasketEntry (state) {
    return (id) => {
      return state.basketEntries.find(basketEntry => basketEntry.id === parseInt(id))
    }
  },
  getBasketEntriesContaining: (state) => {
    return (productId) => {
      return state.basketEntries.filter(basketEntry => parseInt(basketEntry.product_id) === parseInt(productId))
    }
  }
}

const actions = {
  fetchBasketEntries ({ commit }) {
    return App.request('/baskets-entries').then(response => {
      if (App.treatResponse(response)) {
        commit('setBasketEntries', response.data)
      }
    })
  },
  setBasketEntries ({ commit }, basketEntries) {
    commit('setBasketEntries', basketEntries)
  }
}

const mutations = {
  setBasketEntries: (state, basketEntries) => (state.basketEntries = basketEntries)
}

export default {
  state,
  getters,
  actions,
  mutations
}
