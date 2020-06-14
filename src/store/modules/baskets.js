import { App } from '../../core'

const state = {
  baskets: []
}

const getters = {
  getBaskets: (state) => state.baskets,
  getBasket (state) {
    return (id) => {
      return state.baskets.find(basket => basket.id === id)
    }
  }
}

const actions = {
  fetchBaskets ({ commit }) {
    return App.request('/baskets').then(response => {
      if (App.treatResponse(response)) {
        commit('setBaskets', response.data)
      }
    })
  },
  setBaskets ({ commit }, baskets) {
    commit('setBaskets', baskets)
  }
}

const mutations = {
  setBaskets: (state, baskets) => (state.baskets = baskets)
}

export default {
  state,
  getters,
  actions,
  mutations
}
