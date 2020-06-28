import axios from 'axios'
import Vue from 'vue'
import store from '../store'
import DateFormat from 'dateformat'
import router from '../router'

const App = Object.freeze({
  http: axios,
  request: function (url, method = 'get', data = {}) {
    const connectedUser = store.getters.getConnectedUser
    const buffer = connectedUser ? Buffer.from(connectedUser.name + ':' + connectedUser.password) : null
    const config = {
      url: 'http://localhost/Agile-Installations/Demo/share' +
        '/api' + url,
      method: method,
      validateStatus: function (status) {
        return status < 500
      }
    }
    if (buffer) {
      config.headers = {
        Authorization: 'Basic ' + (buffer.toString('base64'))
      }
    }
    method.toLowerCase() === 'get' ? config.params = data : config.data = data
    return axios.request(config)
  },
  treatResponse: function (response, title) {
    if (response.data && response.data.message) {
      Vue.prototype.$notify({
        group: 'notifications',
        title: title,
        text: response.data.message,
        type: response.status >= 400 ? 'error' : 'success'
      })
    }
    if (response.status === 401 && router.currentRoute.path !== '/login') router.push({ name: 'login', params: { next: router.currentRoute } })
    return response.status < 400
  },
  formatDate: function (entry) {
    if (!(entry instanceof Date)) {
      if (typeof entry === 'number') {
        entry = new Date(entry * 1000)
      } else {
        entry = new Date(entry)
      }
    }
    return DateFormat(entry, 'dd/mm/yyyy à HH:MM:ss')
  },
  parseDecimal: function (decimal) {
    return parseFloat(decimal || 0).toFixed(2)
  },
  aggregatePerDay: function (data, dateKey, dataKey) {
    const perDayData = {}
    for (let i = 0; i < data.length; i++) {
      const actualData = data[i]
      if (actualData) {
        let date = ((new Date(actualData[dateKey])))
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)
        date = date.getTime()
        if (!perDayData[date]) perDayData[date] = 0
        perDayData[date] = parseFloat(perDayData[date]) + parseFloat(actualData[dataKey])
      }
    }
    return perDayData
  },
  aggregateByWeekDay: function (data, dateKey, dataKey, humanReadable = false) {
    const perDayData = {}
    for (let i = 0; i < data.length; i++) {
      const actualData = data[i]
      if (actualData) {
        let date = ((new Date(actualData[dateKey])))
        if (humanReadable) {
          date = DateFormat(date, 'dddd')
        } else {
          date = date.getDay()
        }
        if (!perDayData[date]) perDayData[date] = 0
        perDayData[date] = parseFloat(perDayData[date]) + parseFloat(actualData[dataKey])
      }
    }
    return perDayData
  },
  arrayContainsSameValues: function (_arr1, _arr2) {
    if (!Array.isArray(_arr1) || !Array.isArray(_arr2) || _arr1.length !== _arr2.length) { return false }

    const arr1 = _arr1.concat().sort()
    const arr2 = _arr2.concat().sort()

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) { return false }
    }

    return true
  },
  allCommandsStatus: function () {
    return [
      { label: 'Brouillon', value: 'draft', icon: 'far fa-sticky-note', color: '#3297d3' },
      { label: 'En attente de paiement', value: 'payment-waiting', icon: 'far fa-clock', color: '#3297d3' },
      { label: 'Payée', value: 'payed', icon: 'fas fa-comment-dollar', color: '#2db644' },
      { label: 'Expediée', value: 'expedited', icon: 'fas fa-truck', color: 'rgb(213, 199, 0)' },
      { label: 'En cours de livraison', value: 'in-delivering', icon: 'fas fa-pallet', color: 'rgb(213, 199, 0)' },
      { label: 'Reçue', value: 'received', icon: 'fas fa-check', color: '#2db644' },
      { label: 'Annulée par l\'acheteur', value: 'canceled-by-buyer', icon: 'fas fa-comment-slash', color: '#ea2020' },
      { label: 'Annulée par la plateforme', value: 'canceled-by-platform', icon: 'fas fa-ban', color: '#ea2020' },
      { label: 'Remboursée', value: 'refunded', icon: 'fas fa-file-invoice-dollar', color: '#2db644' },
      { label: 'Erreur', value: 'error', icon: 'fas fa-exclamation-triangle', color: '#ea2020' }
    ]
  },
  formatCommandStatus: function (status) {
    const entry = this.allCommandsStatus().find(s => s.value === status)
    if (entry) {
      return "<span style='color: " + entry.color + ";'><i class='" + entry.icon + " r'></i>" + entry.label + '</span>'
    }
    return ''
  }
})

export { App }
