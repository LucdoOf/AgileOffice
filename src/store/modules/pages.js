import { App } from '../../core'

const state = {
  pages: [],
  translations: []
}

const getters = {
  getPages: (state) => state.pages,
  getPage (state) {
    return (id) => {
      return state.pages.find(page => page.id === id)
    }
  },
  getStaticPages: (state) => state.pages.filter(page => page.static === true),
  getPageTranslations (state) {
    return (pageSlug) => {
      return state.translations.filter(translation => translation.id.startsWith(pageSlug + '-'))
    }
  },
  getGlobalTranslations (state, getters) {
    const pageTranslations = []
    for (let i = 0; i < state.pages.length; i++) {
      pageTranslations.push(...getters.getPageTranslations(state.pages[i].slug))
    }
    return state.translations.filter(translation => !pageTranslations.includes(translation))
  }
}

const actions = {
  fetchPages ({ commit }) {
    return App.request('/pages').then(response => {
      if (App.treatResponse(response)) {
        commit('setPages', response.data)
      }
    })
  },
  fetchTranslations ({ commit }) {
    return App.request('/translations/fr_FR').then(response => {
      if (App.treatResponse(response)) {
        commit('setTranslations', response.data)
      }
    })
  },
  setPages ({ commit }, pages) {
    commit('setPages', pages)
  },
  setTranslations ({ commit }, translations) {
    commit('setTranslations', translations)
  }
}

const mutations = {
  setPages: (state, pages) => (state.pages = pages),
  setTranslations: (state, translations) => (state.translations = translations)
}

export default {
  state,
  getters,
  actions,
  mutations
}
