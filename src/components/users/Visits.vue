<template>
  <div id="visits">
    <div class="row">
      <div class="box no-padding w-s12">
        <div class="box-title">
          <span class="title">Visites</span>
        </div>
      </div>
    </div>
    <div class="row">
      <Table class="w-s12" v-bind:columns="{'ip':'Adresse IP','user_id':'Utilisateur connecté','page_id':'Page consultée','visit_date':'Date','visit_duration':'Durée'}"
             v-bind:table-data="this.tableData"
             @update="this.updateVisits"
             ref="table"
             :paginated="true"/>
    </div>
  </div>
</template>

<script>

import Table from '../../components/Table'
import { mapActions } from 'vuex'

export default {
  name: 'Visits',
  components: { Table },
  methods: {
    ...mapActions(['fetchVisits']),
    updateVisits () {
      const sortKey = this.$refs.table.finalSortKey ? (this.$refs.table.finalSortKey + (this.$refs.table.sortInverted ? ' DESC' : ' ASC')) : null
      this.fetchVisits({ page: this.$refs.table.page, sort: sortKey })
    }
  },
  computed: {
    tableData () {
      const visits = this.getVisits
      const toReturn = []
      for (let i = 0; i < visits.length; i++) {
        const visit = Object.assign({}, visits[i])
        if (visit) {
          visit.user_id = visit.user ? visit.user.firstname + ' ' + visit.user.lastname : '&mdash;'
          visit.page_id = visit.page ? visit.page.name : '&mdash;'
          visit.visit_date = this.$app.formatDate(visit.visit_date_stamp)
          visit.visit_duration_value = parseInt(visit.visit_duration)
          visit.visit_duration = visit.visit_duration + ' secondes'
          toReturn.push(visit)
        }
      }
      return toReturn
    }
  }
}
</script>
