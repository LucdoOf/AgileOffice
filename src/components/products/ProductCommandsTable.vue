<template>
    <Table :columns="{'reference':'Référence', 'quantity':'Quantité', 'amount': 'Montant TTC', 'order_date':'Date'}"
           :custom-sort-keys="{'quantity':'SUM(basket_entry.quantity)','amount':'SUM(basket_entry.entry_price)'}"
           :table-data="tableData"
           @row-click="(row) => this.$router.push('/commands/' + row.command_id)"
           ref="table"
           :paginated="true"
           :default-sort="false"
           @update="this.updateCommands"/>
</template>

<script>
import Table from '../Table'
import { mapActions } from 'vuex'

export default {
  name: 'ProductCommandsTable',
  components: { Table },
  props: ['product'],
  methods: {
    ...mapActions(['fetchProductPaginatedCommands']),
    updateCommands () {
      const sortKey = this.$refs.table.finalSortKey ? (this.$refs.table.finalSortKey + (this.$refs.table.sortInverted ? ' DESC' : ' ASC')) : null
      this.fetchProductPaginatedCommands({ productId: this.product.id, page: this.$refs.table.page, sort: sortKey })
    }
  },
  computed: {
    tableData () {
      const chartData = []
      const commands = this.$store.getters.getProductCommands
      for (let i = 0; i < commands.length; i++) {
        const command = commands[i]
        const amount = command.basket.entries.reduce((total, obj) => parseFloat(obj.product_id === this.product.id ? (obj.entry_price) : 0) + total, 0)
        const quantity = command.basket.entries.reduce((total, obj) => parseInt(obj.product_id === this.product.id ? (obj.quantity) : 0) + total, 0)
        if (command) {
          chartData.push({
            id: i,
            command_id: command.id,
            reference: command.reference,
            quantity: quantity,
            amount: this.$app.parseDecimal(amount) + '  €',
            order_date: 'Le ' + this.$app.formatDate(command.order_date_stamp),
            order_date_value: command.order_date_stamp
          })
        }
      }
      return chartData
    }
  }
}

</script>
