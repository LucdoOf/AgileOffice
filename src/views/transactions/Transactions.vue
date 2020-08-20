<template>
  <div id="transactions">
    <div class="row">
      <div class="box w-s12">
        <div class="box-title">
          <span class="title">Transactions</span>
        </div>
      </div>
    </div>
    <div class="row">
      <Table class="w-s12" v-bind:columns="{'reference':'Référence','amount':'Montant','payment_mode_method':'Moyen de paiement','created_at':'Créée le','transaction_type':'Type','status':'Status'}"
             ref="table"
             v-bind:table-data="this.getFormatedTransactions()"
             :paginated="true"
             @update="this.updateTransactions"
             @row-click="(row) => this.$router.push({ name: 'transaction', params: { id: row.id } })"/>
    </div>
  </div>
</template>

<script>

import Table from '../../components/Table'
import { mapActions } from 'vuex'

export default {
  name: 'Transactions',
  components: { Table },
  methods: {
    ...mapActions(['fetchTransactions']),
    getFormatedTransactions () {
      const transactions = this.getTransactions
      const toReturn = []
      for (let i = 0; i < transactions.length; i++) {
        const clone = Object.assign({}, transactions[i])
        if (clone) {
          clone.amount = this.$app.parseDecimal(clone.amount) + ' €'
          clone.transaction_type = this.$app.formatTransactionType(clone.transaction_type)
          clone.payment_mode_method = clone.payment_mode_method ? clone.payment_mode_method.name : '&mdash;'
          clone.created_at = this.$app.formatDate(clone.created_at_stamp)
          clone.status = this.$app.formatTransactionStatus(clone.status)
          toReturn.push(clone)
        }
      }
      return toReturn
    },
    updateTransactions () {
      const sortKey = this.$refs.table.finalSortKey ? (this.$refs.table.finalSortKey + (this.$refs.table.sortInverted ? ' DESC' : ' ASC')) : null
      this.fetchTransactions({ page: this.$refs.table.page, filters: [], sort: sortKey })
    }
  }
}

</script>
