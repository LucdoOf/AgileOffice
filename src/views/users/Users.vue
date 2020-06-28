<template>
  <div id="users">
    <div class="row">
      <div class="box no-padding w-s12">
        <div class="box-title">
          <span class="title">Utilisateurs</span>
        </div>
      </div>
    </div>
    <div class="row">
      <Table class="w-s12" v-bind:columns="{'reference':'Référence','name':'Nom et prénom','mail':'Mail','last_seen':'Dernière connection','inscription_date':'Date d\'inscription'}"
             v-bind:table-data="this.getFormatedUsers()"
             :custom-sort-keys="{'name':'lastname'}"
             @update="this.updateUsers"
             ref="table"
             :paginated="true"
             :default-sort="false"
             @row-click="(row) => this.$router.push({ name: 'user', params: { id: row.id } })"/>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
import Table from '../../components/Table'

export default {
  name: 'Users',
  components: { Table },
  methods: {
    ...mapActions(['fetchPaginatedUsers']),
    getFormatedUsers: function () {
      const users = this.getPaginatedUsers
      const formatedUsers = []
      for (let i = 0; i < users.length; i++) {
        const user = Object.assign({}, users[i])
        if (user) {
          user.name = user.lastname + ' ' + user.firstname
          user.last_seen_value = user.last_seen_stamp
          user.last_seen = user.last_seen ? this.$app.formatDate(user.last_seen_stamp) : '&mdash;'
          user.inscription_date_value = user.inscription_date_stamp
          user.inscription_date = user.inscription_date ? this.$app.formatDate(user.inscription_date_stamp) : '&mdash;'
          formatedUsers.push(user)
        }
      }
      return formatedUsers
    },
    updateUsers: function () {
      const sortKey = this.$refs.table.finalSortKey ? (this.$refs.table.finalSortKey + (this.$refs.table.sortInverted ? ' DESC' : ' ASC')) : null
      this.fetchPaginatedUsers({ page: this.$refs.table.page, sort: sortKey })
    }
  }
}
</script>
