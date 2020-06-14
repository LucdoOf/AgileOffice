import { App } from '../../core'

const state = {
  allCommands: [],
  paginatedCommands: [],
  productCommands: [],
  todayCommands: []
}

const getters = {
  getCommands: (state) => state.allCommands,
  getPaginatedCommands: (state) => state.paginatedCommands,
  getProductCommands: (state) => state.productCommands,
  getTodayCommands: (state) => state.todayCommands,
  getCommand (state) {
    return (id) => {
      return state.allCommands.find(command => command.id === id)
    }
  },
  getCommandsFromUser (state) {
    return (id) => {
      return state.allCommands.filter(command => parseInt(command.basket.user_id) === parseInt(id))
    }
  },
  getBasketCommand (state) {
    return (basketId) => {
      return state.allCommands.find(command => command.basket_id === basketId)
    }
  }
}

const actions = {
  fetchCommands ({ commit }) {
    return App.request('/commands').then(response => {
      if (App.treatResponse(response)) {
        commit('setCommands', response.data)
      }
    })
  },
  fetchPaginatedCommands ({ commit }, { page, filters, sort }) {
    return App.request('/commands/page/' + page, 'post', { filters: filters, sort: sort }).then(response => {
      if (App.treatResponse(response)) {
        commit('setPaginatedCommands', response.data)
      }
    })
  },
  fetchProductCommands ({ commit }, { productId, page, filters, sort }) {
    return App.request('/products/' + productId + '/commands/page/' + page, 'post', { filters: filters, sort: sort }).then(response => {
      if (App.treatResponse(response)) {
        commit('setProductCommands', response.data)
      }
    })
  },
  fetchTodayCommands ({ commit }) {
    return App.request('/stats/commands/today').then(response => {
      if (App.treatResponse(response)) {
        commit('setTodayCommands', response.data)
      }
    })
  },
  setCommands ({ commit }, commands) {
    commit('setCommands', commands)
  }
}

const mutations = {
  setCommands: (state, commands) => (state.allCommands = commands),
  setPaginatedCommands: (state, commands) => (state.paginatedCommands = commands),
  setProductCommands: (state, commands) => (state.productCommands = commands),
  setTodayCommands: (state, commands) => (state.todayCommands = commands)
}

export default {
  state,
  getters,
  actions,
  mutations
}
