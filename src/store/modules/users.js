import { App } from '../../core'

const state = {
  allUsers: [],
  paginatedUsers: [],
  connectedUser: null,
  visits: [],
  actualUser: null,
  actualUserCommands: []
}

const getters = {
  getPaginatedUsers: (state) => state.paginatedUsers,
  getUser (state) {
    return (id) => {
      return state.allUsers.find(user => user.id === id)
    }
  },
  getConnectedUser: (state) => state.connectedUser,
  getUsers: (state) => state.allUsers,
  getVisits: (state) => state.visits,
  getActualUser: (state) => state.actualUser,
  getActualUserCommands: (state) => state.actualUserCommands
}

const actions = {
  fetchPaginatedUsers ({ commit }, { page, filters, sort }) {
    return App.request('/users/page/' + page, 'GET', { filters: filters, sort: sort }).then(response => {
      if (App.treatResponse(response)) {
        commit('setPaginatedUsers', response.data)
      }
    })
  },
  fetchUsers ({ commit }) {
    return App.request('/users').then(response => {
      if (App.treatResponse(response)) {
        commit('setUsers', response.data)
      }
    })
  },
  setConnectedUser ({ commit }, user) {
    commit('setConnectedUser', user)
  },
  fetchVisits ({ commit }, { page, filters, sort }) {
    return App.request('/visits/page/' + page, 'GET', { filters: filters, sort: sort }).then(response => {
      if (App.treatResponse(response)) {
        commit('setVisits', response.data)
      }
    })
  },
  fetchUser ({ commit }, { id }) {
    return App.request('/users/' + id).then(response => {
      if (App.treatResponse(response)) {
        commit('setActualUser', response.data)
      }
    })
  },
  fetchUserCommands ({ commit }, { id }) {
    return App.request('/users/' + id + '/commands').then(response => {
      if (App.treatResponse(response)) {
        commit('setActualUserCommands', response.data)
      }
    })
  }
}

const mutations = {
  setPaginatedUsers: (state, users) => (state.paginatedUsers = users),
  setUsers: (state, users) => (state.allUsers = users),
  setConnectedUser: (state, user) => (state.connectedUser = user),
  setVisits: (state, visits) => (state.visits = visits),
  setActualUser: (state, user) => (state.actualUser = user),
  setActualUserCommands: (state, commands) => (state.actualUserCommands = commands)
}

export default {
  state,
  getters,
  actions,
  mutations
}
