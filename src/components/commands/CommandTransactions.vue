<template>
  <div class="box no-padding">
    <div class="box-title"><span class="title">Transactions liées</span></div>
    <div class="box-content">
      <Table :columns="{'reference':'Référence','amount':'Montant','status':'Status','created_at':'Créée le'}"
             :table-data="this.tableData"
             @row-click="(row) => this.$router.push('/transactions/' + row.id)"/>
    </div>
  </div>
</template>

<script>
import Table from '../Table'
export default {
  name: 'CommandTransactions',
  components: { Table },
  props: ['command'],
  computed: {
    tableData () {
      const toReturn = []
      const transactions = this.command.transactions
      for (let i = 0; i < transactions.length; i++) {
        const transaction = Object.assign({}, transactions[i])
        transaction.amount = this.$app.parseDecimal(transaction.amount) + ' €'
        transaction.status = this.$app.formatTransactionStatus(transaction.status)
        transaction.created_at = this.$app.formatDate(transaction.created_at_stamp)
        toReturn.push(transaction)
      }
      return toReturn
    }
  }
}
</script>
