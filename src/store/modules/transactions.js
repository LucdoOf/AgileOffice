import { App } from '../../core'

const state = {
  transactions: [],
  actualTransaction: null
}

const getters = {
  getTransactions: (state) => state.transactions,
  getActualTransaction: (state) => state.actualTransaction
}

const actions = {
  fetchTransactions ({ commit }, { page, filters, sort }) {
    return App.request('/transactions/page/' + page, 'get', { filters: filters, sort: sort }).then(response => {
      if (App.treatResponse(response)) {
        commit('setTransactions', response.data)
      }
    })
  },
  fetchTransaction ({ commit }, { id }) {
    return App.request('/transactions/' + id).then(response => {
      if (App.treatResponse(response)) {
        commit('setActualTransaction', response.data)
      }
    })
  }
}

const mutations = {
  setTransactions: (state, transactions) => (state.transactions = transactions),
  setActualTransaction: (state, transaction) => (state.actualTransaction = transaction)
}

export default {
  state,
  getters,
  actions,
  mutations
}
